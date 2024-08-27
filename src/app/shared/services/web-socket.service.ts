import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from 'socket.io-client';
import { AppConfigService } from "../../../environments/services/config.service";
import { MessageNamespace } from "../namespaces/messages.namespace";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private _socket: Socket;
    private _baseApi: string = AppConfigService.env.baseApi;

    constructor() {
        this._socket = io(`${this._baseApi}/chatroom`);
        this._socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });
    }

    public listen(eventName: string): Observable<unknown> {
        return new Observable((subscriber) => {
            this._socket.on(eventName, (data) => {
                subscriber.next(data);
            })
        });
    }

    public sendMessage(message: MessageNamespace.MessageInterface): void {
        this._socket.emit('message', message);
    }

    public receiveMessage(): Observable<MessageNamespace.MessageInterface> {
        return new Observable<MessageNamespace.MessageInterface>((observer) => {
            this._socket.on('message', (message: MessageNamespace.MessageInterface) => {
                observer.next(message);
            });
        });
    }
}
