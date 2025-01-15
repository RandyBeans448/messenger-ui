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
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'app-friend-request-card',
    templateUrl: './friend-request-card.component.html',
    styleUrls: ['./friend-request-card.component.scss'],
    standalone: true,
    imports: [CommonModule, AvatarComponent, ButtonComponent, SpinnerComponent,],
})
export class FriendRequestsCardComponent {

    @Input()
    public friendRequest: any;

    @Input()
    public isLoading: boolean = false;

    @Output()
    public requestRespond: EventEmitter<FriendRequestNamespace.FriendRequestResponseInterface> = new EventEmitter<FriendRequestNamespace.FriendRequestResponseInterface>();

    public user: UserNamespace.UserInterface;

    private _destroyed$: Subject<void> = new Subject<void>();

    constructor(
        private _accountService: AccountService,
    ) { }

    public ngOnInit() {
        this._accountService.getAccount()
            .pipe(takeUntil(this._destroyed$))
            .subscribe(account => {
                this.user = account.user;
            });
    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public async respondToFriendRequest(response: boolean): Promise<void> {
        const responseFriendRequest: FriendRequestNamespace.FriendRequestResponseInterface = {
            friendRequestId: this.friendRequest.receiver.friendRequestId,
            response: response,
        };

        this.requestRespond.emit(responseFriendRequest);
    }
}