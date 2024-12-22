import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    imports: [CommonModule]
})

export class AvatarComponent {
    @Input()
    public initials: string = '';

    @Input()
    public active: boolean = false;

    @Output()
    public avatarClicked: EventEmitter<any> = new EventEmitter<any>();

    public onAvatarClicked($event: any): void {
        this.avatarClicked.emit($event);
    }
}