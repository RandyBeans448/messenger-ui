import { Component, Input } from "@angular/core";
import { AccountService } from "../services/account.service";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../components/button/button.component";
import { FriendRequestService } from "../services/friend-request.service";
import { FriendRequestNamespace } from "../interfaces/friend-request.interface";
import { ToastrService } from "ngx-toastr";
import { AvatarComponent } from "../components/avatar/avatar.component";

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

    constructor(
        private _friendRequestService: FriendRequestService,
        private _toastService: ToastrService,
    ) { }

    public ngOnInit() {

    }


    public async repsondeToFriendRequest(response: boolean) {

        const responseFriendRequest: FriendRequestNamespace.FriendRequestResponseInterface = {
            friendRequestId: this.friendRequest.id,
            response: response,
        }

        await this._friendRequestService.respondToFriendRequest(responseFriendRequest).subscribe(res => {
            if (res === 'Friend Request Accepted') this._toastService.success(res);
        });
    }
}