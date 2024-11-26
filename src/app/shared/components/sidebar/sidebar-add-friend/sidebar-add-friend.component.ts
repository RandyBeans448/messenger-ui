import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AuthModule } from "@auth0/auth0-angular";
import { ButtonComponent } from "../../button/button.component";
import { IconComponent } from "../../icon/icon.component";
import { AvatarComponent } from "../../avatar/avatar.component";


@Component({
    selector: 'app-sidebar-add-friend',
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
        AuthModule,
        ButtonComponent,
        AvatarComponent
    ],
    templateUrl: './sidebar-add-friend.component.html',
    styleUrls: ['./sidebar-add-friend.component.scss'],
})
export class SidebarAddFriendComponent {

    constructor() { }

    @Input()
    public user: any;

    @Output()
    public addFriendByUserId: EventEmitter<string> = new EventEmitter<string>();

    public async addFriend(
        userId: string = this.user.id,
    ): Promise<void> {
        this.addFriendByUserId.emit(userId);
    }
}