import { Component } from "@angular/core";
import { WebSocketService } from "../../shared/services/web-socket.service";

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent {
    constructor(private websocketService: WebSocketService) {}

    ngOnInit() {
      this.websocketService.sendMessage('Hello from Angular');
  
      this.websocketService.onMessage().subscribe((message) => {
        console.log('Message from server:', message);
      });
  
      this.websocketService.onNotification().subscribe((notification) => {
        console.log('Notification from server:', notification);
      });
    }

    public async sendMessage(message: any) {
        await this.websocketService.sendMessage(message);
    }
}