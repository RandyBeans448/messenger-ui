import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { io, Socket } from 'socket.io-client';
import { AppConfigService } from "../../../environments/services/config.service";
import { MessageNamespace } from "../namespaces/messages.namespace";
import { KeyService } from "./key.service";
import { WebSocketNamespace } from "../namespaces/websocket.namespace";


@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private _socket: Socket;
    private _baseApi: string = AppConfigService.env.baseApi;
    private sharedSecret: string;
    private _otherUserPublicKey: string; // save these with the other socket id
    private _keys: WebSocketNamespace.WebSocketInterface[] = [];

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

        this._socket.on('receive_public_key', (
            data: { 
                socketId: string,
                publicKey: string,
            }
        ) => {
            this._otherUserPublicKey = data.publicKey;
            
            this._keys.push({
                socketId: data.socketId,
                keyId: data.publicKey
            });
            console.log(this._keys.length)
        });
    }

    public sendMessage(message: MessageNamespace.MessageInterface): void {
        message.message = this._keyService.encryptMessage(message.message, this.sharedSecret);
        this._socket.emit('message', message);
    }

    public receiveMessage(): Observable<MessageNamespace.MessageInterface> {
        return new Observable<MessageNamespace.MessageInterface>((observer: Subscriber<MessageNamespace.MessageInterface>) => {
            this._socket.on('message', (message: MessageNamespace.MessageInterface) => {

                console.log(this._keys);
                let test;
                let decryptedMessage = this._keyService.decryptMessage(message.message, this.sharedSecret);

                for (const key of this._keys) {
                        let test = this._keyService.decryptMessage(message.message, key.keyId);

                        if (test.length > 0) {
                            message.message = test;
                            observer.next(message);
                        }
                }



                // if (decryptedMessage.length === 0) {
                //     console.log('no length', decryptedMessage.length)
                //     decryptedMessage = this._keyService.decryptMessage(message.message, this._otherUserPublicKey);
                //     message.message = decryptedMessage;

                // } else {
                //     console.log('has length', decryptedMessage.length)
                //     message.message = decryptedMessage;
                // }
                
            });
        });
    }
}
