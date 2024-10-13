import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../components/button/button.component";
import { FriendRequestService } from "../services/friend-request.service";
import { FriendRequestNamespace } from "../namespaces/friend-request.namespace";
import { ToastrService } from "ngx-toastr";
import { AvatarComponent } from "../components/avatar/avatar.component";
import { UserNamespace } from "../namespaces/user.interface";
import { AccountService } from "../services/account.service";

@Component({
    selector: 'app-friend-request-card',
    templateUrl: './friend-request-card.component.html',
    styleUrls: ['./friend-request-card.component.scss'],
    standalone: true,
    imports: [CommonModule, AvatarComponent, ButtonComponent],
})
export class FriendRequestsCardComponent {

    @Input()
    public friendRequest: any;

    public user: UserNamespace.UserInterface;

    constructor(
        private _accountService: AccountService,
        private _friendRequestService: FriendRequestService,
        private _toastService: ToastrService,
    ) { }

    public ngOnInit() {
        this._accountService.getAccount().subscribe(account => {
            this.user = account.user;
        });
    }

    public async respondToFriendRequest(response: boolean) {
        const responseFriendRequest: FriendRequestNamespace.FriendRequestResponseInterface = {
            friendRequestId: this.friendRequest.receiver.friendRequestId,
            response: response,
        }

        try {
            this._friendRequestService.respondToFriendRequest(responseFriendRequest).subscribe(res => {
                if (res === 'Friend Request Accepted') {
                    this._toastService.success(res);
                }
            });
        } catch (error) {
            this._toastService.error('Error responding friend request');
        }
    }
}