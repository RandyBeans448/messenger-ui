import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MessageNamespace } from "../../namespaces/messages.namespace";

@Component({
    selector: 'app-chat-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chat-bar.component.html',
    styleUrls: ['./chat-bar.component.scss'],
})
export class ChatBarComponent {

    @Input()
    public title: string = '';

    @Output()
    messageValue: EventEmitter<MessageNamespace.SendMessageInterface> = new EventEmitter<MessageNamespace.SendMessageInterface>();

    public sendMessage(message: string): void {

        const messageObject: MessageNamespace.SendMessageInterface = {
            message: message,
            senderId: 'user',
            conversation: null,
            createdAt: new Date().toLocaleTimeString(),
            updatedAt: new Date().toLocaleTimeString(),
        };

        this.messageValue.emit(messageObject);
    }
}