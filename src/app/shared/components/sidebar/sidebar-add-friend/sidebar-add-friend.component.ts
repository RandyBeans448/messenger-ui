import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AuthModule } from "@auth0/auth0-angular";
import { ButtonComponent } from "../../button/button.component";
import { IconComponent } from "../../icon/icon.component";
import { AvatarComponent } from "../../avatar/avatar.component";
import { FriendRequestService } from "../../../services/friend-request.service";
import { ToastrService } from "ngx-toastr";

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

    constructor(
        private _friendRequestService: FriendRequestService,
        private _toastrService: ToastrService,
    ) { }

    @Input()
    public user: any;

    public async addFriend(
        userId: string = this.user.id,
    ): Promise<void> {
        try {
            this._friendRequestService.sendFriendRequest(userId).subscribe(() => {
                this._toastrService.success('Friend request sent successfully');
            });
        } catch (error) {
            this._toastrService.error('Error sending friend request');
        }
    }
}