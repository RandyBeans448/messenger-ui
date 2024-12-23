import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { MessageNamespace } from "../../namespaces/messages.namespace";

@Component({
    selector: 'app-chat-bar',
    imports: [CommonModule],
    templateUrl: './chat-bar.component.html',
    styleUrls: ['./chat-bar.component.scss'],
    standalone: true,
})
export class ChatBarComponent {

    @ViewChild('messageInput')
    public messageInput: ElementRef;

    @Output()
    messageValue: EventEmitter<MessageNamespace.SendMessageInterface> = new EventEmitter<MessageNamespace.SendMessageInterface>();

    public sendMessage(message: string): void {

        const messageObject: MessageNamespace.SendMessageInterface = {
            message: message,
            sender: null,
            conversation: null,
            createdAt: new Date().toLocaleTimeString(),
            updatedAt: new Date().toLocaleTimeString(),
        };

        this.messageValue.emit(messageObject);
        this.messageInput.nativeElement.value = '';
    }
}