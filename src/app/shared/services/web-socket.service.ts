import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { io, Socket } from 'socket.io-client';
import { AppConfigService } from "../../../environments/services/config.service";
import { MessageNamespace } from "../namespaces/messages.namespace";
import { CryptoService } from "./crypto.service";
import { HttpClient } from "@angular/common/http";
import { ConversationNamespace } from "../namespaces/conversations.namespace";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private _socket: Socket;
    private readonly _baseApi: string = AppConfigService.env.baseApi;
    private _sharedSecret: string;

    constructor(
        private readonly _cryptoService: CryptoService,
        private readonly _http: HttpClient,
        private _toastrService: ToastrService,
    ) { }

    /**
     * Establishes a WebSocket connection and joins the chatroom
     * @param conversationId - The ID of the conversation to join
     */
    public connectToChatroom(conversationId: string): void {
        if (!this._socket || !this._socket.connected) {
            this._socket = io(`${this._baseApi}/chatroom`, { query: { conversationId } });
            this._socket.emit('join', conversationId);
        }
    }

    /**
     * Disconnects from the WebSocket and emits a disconnect event
     */
    public disconnectFromChatroom(): void {
        if (this._socket && this._socket.connected) {
            this._socket.emit('disconnectClient');
            this._socket.disconnect();
            console.log('.disconnect')
        }
    }

    /**
     * Sends an encrypted message through the WebSocket
     * @param message - The message to send
     * @param sharedSecret - The encryption key
     */
    public async sendMessage(
        message: MessageNamespace.SendMessageInterface,
        sharedSecret: string,
    ): Promise<void> {
        try {
            message.message = await this._cryptoService.encryptMessage(message.message, sharedSecret);
            this._socket.emit('message', message);
        } catch (error) {
            console.error('Failed to encrypt and send message:', error);
        }
    }

    /**
     * Listens for incoming messages and decrypts them
     * @param sharedSecret - The decryption key
     * @returns Observable of decrypted messages
     */
    public receiveMessages(sharedSecret: string): Observable<MessageNamespace.MessageInterface> {
        return new Observable((observer) => {
            this._socket.on('message', async (message: MessageNamespace.MessageInterface) => {
                try {
                    const decryptedMessage = await this._cryptoService.decryptMessage(message.message, sharedSecret);
                    message.message = decryptedMessage.message;
                    observer.next(message);
                } catch (error) {
                    console.error('Failed to decrypt incoming message:', error);
                }
            });
        });
    }

    /**
     * Retrieves a conversation by its ID from the server
     * @param id - The conversation ID
     * @returns Observable of the conversation data
     */
    public getConversationById(id: string): Observable<ConversationNamespace.ConversationInterface> {
        return this._http.get<ConversationNamespace.ConversationInterface>(`${this._baseApi}/conversations/${id}`).pipe(
            catchError((error) => {
                this._toastrService.error('Sorry that conversation can not be found.');
                throw new Error(error);
            })
        );
    }

    /**
     * Gets the current shared secret
     * @returns The shared secret
     */
    public getSharedSecret(): string {
        return this._sharedSecret;
    }

    /**
     * Sets the shared secret
     * @param secret - The shared secret to set
     */
    public setSharedSecret(secret: string): void {
        this._sharedSecret = secret;
    }
}
