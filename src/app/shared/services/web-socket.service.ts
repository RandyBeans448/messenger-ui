// src/app/websocket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket: Socket;

    constructor() {
        this.socket = io('http://localhost:8000'); // Ensure this matches your NestJS server address
    }

    public disconnectSocket() {
        this.socket.disconnect();
    }

    public sendMessage(message: string) {
        this.socket.emit('message', message);
    }

    public onMessage() {
        return new Observable(observer => {
            this.socket.on('message', (data: any) => {
                console.log('oyoy')
                console.log(data)
                observer.next(data);
            });
        });
    }

    public onNotification() {
        return new Observable(observer => {
            this.socket.on('notification', (data: any) => {
                observer.next(data);
            });
        });
    }
}
