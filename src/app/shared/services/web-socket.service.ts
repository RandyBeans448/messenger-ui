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
    private _sharedSecret: string;

    constructor(
        private _keyService: KeyService,
        private _cryptoService: CryptoService, // Service handling cryptographic functions
    ) {}

    public async handleConnection(conversationId: string) {
        this._socket = io(`${this._baseApi}/chatroom`);
    
        this._socket.on('connect', () => {
            this._socket.emit('join', conversationId);
            this._socket.on('receive_public_key', async (data: { publicKey: string }) => {
                try {
                    this._sharedSecret = data.publicKey;
                } catch (error) {
                    console.error('Error handling connection:', error);
                }
            });
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
                    const decryptedMessage: string = await this._cryptoService.decryptMessage(
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

