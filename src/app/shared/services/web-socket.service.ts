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

    public async handleConnection(conversation: any) {
        this._socket = io(`${this._baseApi}/chatroom`);
        this._socket.emit('join')
    }

    public async handleDisconnection(): Promise<void> {
        this._socket.disconnect();
        this._socket.emit('disconnectClient');
    }

    public async sendMessage(
        message: MessageNamespace.SendMessageInterface,
        sharedSecret: string,
    ): Promise<void> {
        try {
            message.message = await this._cryptoService.encryptMessage(message.message, sharedSecret);
            this._socket.emit('message', message);
        } catch (error) {
            console.error('Encryption failed:', error);
        }
    }

    public receiveMessage(sharedSecret: string): Observable<MessageNamespace.MessageInterface> {
        return new Observable((observer) => {
            this._socket.on('message', async (message: MessageNamespace.MessageInterface) => {
                try {

                    const decryptedMessage = await this._cryptoService.decryptMessage(
                        message.message,
                        sharedSecret,
                    );

                    message.message = decryptedMessage.message;
                    observer.next(message);
                } catch (error) {
                    console.error('Decryption failed:', error);
                }
            });
        });
    }

    public getConversationById(id: string): any {
        try {
            return this._http
                .get(`${this._baseApi}/conversations/${id}`)
                .pipe(
                    catchError((error) => {
                        throw error;
                    })
                );
        } catch (error) {
            console.error('Decryption failed:', error);
        }
    }

    public getSharedSecret() {
        return this._sharedSecret;
    }
}

