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

            this._myPrivateKey = this._keyService.getPrivateKey();
            this._myPublicKey = this._keyService.getPublicKey();
            this._socket.emit('send_public_key', { publicKey: this._myPublicKey });
        });

        this._socket.on('receive_public_key', async (data: { publicKey: string }) => {
            try {
                this._otherUserPublicKey = data.publicKey;
                this._myPrivateKey = this._keyService.getPrivateKey();

                this._sharedSecret = await this._cryptoService.generateSharedSecret(
                    this._myPrivateKey,
                    this._otherUserPublicKey,
                );
                console.log(this._sharedSecret  )
                console.log('Shared secret established:', this._sharedSecret);
            } catch (error) {
                console.error('Error generating shared secret:', error);
            }
        });

        console.log(this._sharedSecret)
    }

    public async sendMessage(message: MessageNamespace.MessageInterface): Promise<void> {
        if (!this._sharedSecret) {
            await this._waitForSharedSecret();
        }
        // Encrypt the message using the shared secret
        message.message = this._cryptoService.encryptMessage(message.message, this._sharedSecret);
        this._socket.emit('message', message);
    }

    public receiveMessage(): Observable<MessageNamespace.MessageInterface> {
        return new Observable((observer) => {
            this._socket.on('message', async (message: MessageNamespace.MessageInterface) => {
                try {
                    if (!this._sharedSecret) {
                        await this._waitForSharedSecret();
                    }

                    const decryptedMessage: string = this._cryptoService.decryptMessage(
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
    private _waitForSharedSecret(): Promise<void> {
        return new Promise((resolve) => {
            const checkSecret = () => {
                if (this._sharedSecret) {
                    resolve();
                } else {
                    setTimeout(checkSecret, 50); // Check every 50ms
                }
            };
            checkSecret();
        });
    }
}

