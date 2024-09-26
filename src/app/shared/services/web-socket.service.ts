import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { io, Socket } from 'socket.io-client';
import { AppConfigService } from "../../../environments/services/config.service";
import { MessageNamespace } from "../namespaces/messages.namespace";
import { KeyService } from "./key.service";
import { WebSocketNamespace } from "../namespaces/websocket.namespace";
import { CryptoService } from "./crypto.service";



@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private _socket: Socket;
    private _baseApi: string = AppConfigService.env.baseApi;
    private _otherUserPublicKey: string;
    private _myPublicKey: string;
    private _myPrivateKey: string;
    private _sharedSecret: string;

    constructor(
        private _keyService: KeyService,
        private _cryptoService: CryptoService, // Service handling cryptographic functions
    ) {}

    public async handleConnection(conversationId: string) {
        this._socket = io(`${this._baseApi}/chatroom`);
    
        this._socket.on('connect', () => {
            this._socket.emit('join', conversationId);
    
            // Get public and private keys
            this._myPublicKey = this._cryptoService.getPublicKey(); // Base64-encoded
            this._myPrivateKey = this._cryptoService.getPrivateKey(); // Hex string
    
            // Send the Base64-encoded public key
            this._socket.emit('send_public_key', { publicKey: this._myPublicKey });
        });
    
        this._socket.on('receive_public_key', async (data: { publicKey: string }) => {
            try {

                // Store the received Base64-encoded public key
                this._otherUserPublicKey = data.publicKey;
                console.log('this._otherUserPublicKey' ,this._otherUserPublicKey, 'this._otherUserPublicKey')
                // Generate the shared secret
                this._sharedSecret = await this._cryptoService.generateSharedSecret(
                    this._otherUserPublicKey,
                    this._myPrivateKey,
                );
                console.log('Shared secret established:', this._sharedSecret);
            } catch (error) {
                console.error('Error generating shared secret:', error);
            }
        });


    }
    

    public async sendMessage(message: MessageNamespace.MessageInterface): Promise<void> {
        try {
            message.message = await this._cryptoService.encryptMessage(message.message, this._sharedSecret);
            this._socket.emit('message', message);
        } catch (error) {
            console.error('Encryption failed:', error);
        }
    }

    public receiveMessage(): Observable<MessageNamespace.MessageInterface> {
        return new Observable((observer) => {
            this._socket.on('message', async (message: MessageNamespace.MessageInterface) => {
                try {
                    console.log(message)
                    const decryptedMessage: string = await this._cryptoService.decryptMessage(
                        message.message,
                        this._sharedSecret,
                    );

                    console.log('decryptedMessage --------------->', decryptedMessage, '<--------------- decryptedMessage')

                    // message.message = decryptedMessage;
                    observer.next(message);
                } catch (error) {
                    console.error('Decryption failed:', error);
                }
            });
        });
    }
}

