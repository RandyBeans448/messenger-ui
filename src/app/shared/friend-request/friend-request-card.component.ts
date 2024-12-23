import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../components/button/button.component";
import { FriendRequestService } from "../services/friend-request.service";
import { FriendRequestNamespace } from "../namespaces/friend-request.namespace";
import { ToastrService } from "ngx-toastr";
import { AvatarComponent } from "../components/avatar/avatar.component";
import { UserNamespace } from "../namespaces/user.interface";
import { AccountService } from "../services/account.service";
import { SpinnerComponent } from "../components/spinner/spinner.component";

@Component({
    selector: 'app-friend-request-card',
    templateUrl: './friend-request-card.component.html',
    styleUrls: ['./friend-request-card.component.scss'],
    imports: [
        CommonModule,
        AvatarComponent,
        ButtonComponent, 
        SpinnerComponent,
    ],
    standalone: true,
})
export class FriendRequestsCardComponent {

    @Input()
    public friendRequest: any;

    @Input()
    public isLoading: boolean = false;

    @Output()
    public requestRespond: EventEmitter<FriendRequestNamespace.FriendRequestResponseInterface> = new EventEmitter<FriendRequestNamespace.FriendRequestResponseInterface>();

    public user: UserNamespace.UserInterface;

    constructor(
        private _accountService: AccountService,
    ) { }

    public ngOnInit() {
        this._accountService.getAccount()
            .subscribe(account => {
                this.user = account.user;
            });
    }

    public async respondToFriendRequest(response: boolean): Promise<void> {
        const responseFriendRequest: FriendRequestNamespace.FriendRequestResponseInterface = {
            friendRequestId: this.friendRequest.receiver.friendRequestId,
            response: response,
        };

        this.requestRespond.emit(responseFriendRequest);
    }
}