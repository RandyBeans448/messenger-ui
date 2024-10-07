import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { io, Socket } from 'socket.io-client';
import { AppConfigService } from "../../../environments/services/config.service";
import { MessageNamespace } from "../namespaces/messages.namespace";
import { CryptoService } from "./crypto.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private _socket: Socket;
    private _baseApi: string = AppConfigService.env.baseApi;
    private _sharedSecret: string;

    constructor(
        private _cryptoService: CryptoService,
        private _http: HttpClient,
    ) { }

    public async handleConnection(conversationId: string) {
        this._socket = io(`${this._baseApi}/chatroom`);

        this._socket.on('connect', () => {
            this._socket.emit('join', conversationId);
            this._socket.on('join', async (data: string) => {
                try {
                    this._sharedSecret = data;
                    console.log(this._sharedSecret, 'this is the shared secret');
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

                    const decryptedMessage = await this._cryptoService.decryptMessage(
                        message.message,
                        this._sharedSecret,
                    );
                    
                    message.message = decryptedMessage.message;
                    observer.next(message);
                } catch (error) {
                    console.error('Decryption failed:', error);
                }
            });
        });
    }

    public getConversationById(id: string): Observable<Object> {
        return this._http
            .get(`${this._baseApi}/conversations/${id}`)
            .pipe(
                catchError((error) => {
                    throw error;
                })
            );
    }

    public getSharedSecret() {
        return this._sharedSecret;
    }
}

