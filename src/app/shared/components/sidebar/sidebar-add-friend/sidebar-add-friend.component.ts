import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AuthModule } from "@auth0/auth0-angular";
import { ButtonComponent } from "../../button/button.component";
import { IconComponent } from "../../icon/icon.component";
import { AvatarComponent } from "../../avatar/avatar.component";
import { SpinnerComponent } from "../../spinner/spinner.component";


@Component({
    selector: 'app-sidebar-add-friend',
    imports: [
        CommonModule,
        AuthModule,
        ButtonComponent,
        AvatarComponent,
        SpinnerComponent,
    ],
    templateUrl: './sidebar-add-friend.component.html',
    styleUrls: ['./sidebar-add-friend.component.scss'],
    standalone: true,
})
export class SidebarAddFriendComponent {

    constructor() { }

    @Input()
    public user: any;

    @Input()
    public isLoading: boolean = false;

    @Output()
    public addFriendByUserId: EventEmitter<string> = new EventEmitter<string>();

    public async addFriend(
        userId: string = this.user.id,
    ): Promise<void> {
        this.addFriendByUserId.emit(userId);
    }
}