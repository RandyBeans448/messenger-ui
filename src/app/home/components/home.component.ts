import { Component } from "@angular/core";
import { AccountService } from "../../shared/services/account.service";
import { BehaviorSubject, Subject } from "rxjs";
import { AccountNamespace } from "../../shared/namespaces/account.namespace";
import { Router, } from "@angular/router";
import { FriendRequestService } from "../../shared/services/friend-request.service";
import { FriendRequestNamespace } from "../../shared/namespaces/friend-request.namespace";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false,
})
export class HomeComponent {

    constructor(
        private _accountService: AccountService,
        private _friendRequestService: FriendRequestService,
        private _router: Router,
        private _toastService: ToastrService,
    ) { }

    public user: BehaviorSubject<AccountNamespace.AccountInterface>;

    public friends: any;

    public receivedFriendRequests: any = [];

    public usersThatHaveNotBeenFriended: any[] = [];

    public isLoadingFriendRequestResponse: boolean = false;

    public isLoadingAddFriend: boolean = false;

    private _destroyed$: Subject<void> = new Subject<void>();

    ngOnInit() {
        this.user = this._accountService.getAccount();
        this.friends = this.user.value.user.friend;

        this._accountService.getReceivedFriendRequests().subscribe(requests => {
            this.receivedFriendRequests = requests;
        });

        this._accountService.getAvailableUsers().subscribe(friends => {
            this.usersThatHaveNotBeenFriended = friends;
        });
    }

    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    onUpdateAccount(): void {
        // Implement your update logic here, for example, open a modal or navigate to another page
        console.log('Update Account button clicked');;
        // You can call the update service or open an update form modal
    }

    public toChatRoom(
        conversationId: string,
    ): void {
        this._router.navigate([`/chat-room/${conversationId}`]);
    }

    public async respondToFriendRequest(event: FriendRequestNamespace.FriendRequestResponseInterface): Promise<void> {

        this.isLoadingFriendRequestResponse = true;

        const responseFriendRequest: FriendRequestNamespace.FriendRequestResponseInterface = {
            friendRequestId: event.friendRequestId,
            response: event.response,
        };

        try {
            this._friendRequestService
                .respondToFriendRequest(responseFriendRequest)
                .subscribe((res) => {
                    this._toastService.success(res.message);

                    this._accountService.getReceivedFriendRequests().subscribe(requests => {
                        this.receivedFriendRequests = requests;
                    });

                    this.friends = this.user.value.user.friend;
                });
        } catch (error) {
            this.isLoadingFriendRequestResponse = false;
            this._toastService.error('Error responding friend request');
        }
    }

    public async addFriend(userId: any): Promise<void> {
        try {
            this._friendRequestService
                .sendFriendRequest(userId)
                .subscribe(() => {
                    this._toastService.success('Friend request sent successfully');

                    this._accountService.getAvailableUsers().subscribe(friends => {
                        this.usersThatHaveNotBeenFriended = friends;
                    });

                    this._accountService.getReceivedFriendRequests().subscribe(requests => {
                        this.receivedFriendRequests = requests;
                    });
                });
        } catch (error) {
            this._toastService.error('Error sending friend request');
        }
    }
}