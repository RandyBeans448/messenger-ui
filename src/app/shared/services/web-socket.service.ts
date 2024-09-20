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
    private _sharedSecret: string;

    constructor(
        private _keyService: KeyService,
        private _cryptoService: CryptoService, // Service handling cryptographic functions
    ) {}

    public async handleConnection(conversationId: string) {
        this._socket = io(`${this._baseApi}/chatroom`);
        
        this._socket.on('connect', () => {
            this._socket.emit('join', conversationId);

            this._myPublicKey = this._keyService.getPublicKey();
            this._socket.emit('send_public_key', { publicKey: this._myPublicKey });
        });

        this._socket.on('receive_public_key', async (data: { publicKey: string }) => {
            this._otherUserPublicKey = data.publicKey;

            // Generate shared secret using your private key and the other user's public key
        this._sharedSecret = await this._cryptoService.generateSharedSecret(
            this._myPublicKey,
                this._otherUserPublicKey,
            );
        });
    }

    public sendMessage(message: MessageNamespace.MessageInterface): void {
        // Encrypt the message using the shared secret
        message.message = this._cryptoService.encryptMessage(message.message, this._sharedSecret);
        this._socket.emit('message', message);
    }

    public receiveMessage(): Observable<MessageNamespace.MessageInterface> {
        return new Observable((observer) => {
            this._socket.on('message', (message: MessageNamespace.MessageInterface) => {
                try {
                    // Decrypt the message using the shared secret
                    const decryptedMessage = this._cryptoService.decryptMessage(
                        message.message,
                        this._sharedSecret,
                    );
                    message.message = decryptedMessage;
                    observer.next(message);
                } catch (error) {
                    console.error('Decryption failed:', error);
                }
            });
        });
    }
}

