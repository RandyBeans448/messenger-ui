import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { io, Socket } from 'socket.io-client';
import { AppConfigService } from "../../../environments/services/config.service";
import { MessageNamespace } from "../namespaces/messages.namespace";
import { KeyService } from "./key.service";


@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private _socket: Socket;
    private _baseApi: string = AppConfigService.env.baseApi;
    private sharedSecret: string;
    private _otherUserPublicKey: string;
    constructor(
        private _keyService: KeyService,
    ) {}

    public async handleConnection(conversationId: string) {

        this._socket = io(`${this._baseApi}/chatroom`);
        
        this._socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        this.sharedSecret = this._keyService.getPublicKey();
        
        this._socket.emit('join', conversationId);

        this._socket.emit('send_public_key', { publicKey: this.sharedSecret });

        this._socket.on('receive_public_key', (data: { publicKey: string }) => {
            this._otherUserPublicKey = this._keyService.getSharedSecret(data.publicKey);
            console.log(this._otherUserPublicKey, '<===== this._otherUserPublicKey');
        });
    }

    public sendMessage(message: MessageNamespace.MessageInterface): void {
        message.message = this._keyService.encryptMessage(message.message, this.sharedSecret);
        this._socket.emit('message', message);
    }

    public receiveMessage(): Observable<MessageNamespace.MessageInterface> {
        return new Observable<MessageNamespace.MessageInterface>((observer: Subscriber<MessageNamespace.MessageInterface>) => {
            this._socket.on('message', (message: MessageNamespace.MessageInterface) => {
                const decryptedMessage = this._keyService.decryptMessage(message.message, this._otherUserPublicKey);
                message.message = decryptedMessage;
                observer.next(message);
            });
        });
    }
}
