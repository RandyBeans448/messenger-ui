import { CommonModule } from "@angular/common";
import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";

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
    messageValue: EventEmitter<string> = new EventEmitter<string>();

    public sendMessage(message: string): void {
        this.messageValue.emit(message);
    }
}