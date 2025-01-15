import { Component } from "@angular/core";
import { AccountService } from "../../shared/services/account.service";
import { BehaviorSubject, Subject } from "rxjs";
import { AccountNamespace } from "../../shared/namespaces/account.namespace";
import { Router } from "@angular/router";
import { FriendRequestService } from "../../shared/services/friend-request.service";
import { FriendRequestNamespace } from "../../shared/namespaces/friend-request.namespace";
import { ToastrService } from "ngx-toastr";
import { takeUntil, switchMap } from 'rxjs/operators';

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

        this._accountService.getReceivedFriendRequests()
            .pipe(takeUntil(this._destroyed$))
            .subscribe(requests => {
                this.receivedFriendRequests = requests;
            });

        this._accountService.getAvailableUsers()
            .pipe(takeUntil(this._destroyed$))
            .subscribe(friends => {
                this.usersThatHaveNotBeenFriended = friends;
            });
    }

    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    onUpdateAccount(): void {
        console.log('Update Account button clicked');
    }

    public toChatRoom(conversationId: string): void {
        this._router.navigate([`/chat-room/${conversationId}`]);
    }

    public async respondToFriendRequest(event: FriendRequestNamespace.FriendRequestResponseInterface): Promise<void> {
        this.isLoadingFriendRequestResponse = true;

        const responseFriendRequest: FriendRequestNamespace.FriendRequestResponseInterface = {
            friendRequestId: event.friendRequestId,
            response: event.response,
        };

        this._friendRequestService
            .respondToFriendRequest(responseFriendRequest)
            .pipe(
                takeUntil(this._destroyed$),
                switchMap(() => this._accountService.getReceivedFriendRequests()),
                switchMap(requests => {
                    this.receivedFriendRequests = requests;
                    return this._accountService.getAccountInformationFromServer();
                })
            )
            .subscribe({
                next: () => {
                    this.friends = this.user.value.user.friend;
                    this.isLoadingFriendRequestResponse = false;
                    this._toastService.success('Friend request responded successfully');
                },
                error: () => {
                    this.isLoadingFriendRequestResponse = false;
                    this._toastService.error('Error responding to friend request');
                },
            });
    }

    public async addFriend(userId: any): Promise<void> {
        this._friendRequestService
            .sendFriendRequest(userId)
            .pipe(
                takeUntil(this._destroyed$),
                switchMap(() => this._accountService.getAvailableUsers()),
                switchMap(friends => {
                    this.usersThatHaveNotBeenFriended = friends;
                    return this._accountService.getReceivedFriendRequests();
                })
            )
            .subscribe({
                next: (requests) => {
                    this.receivedFriendRequests = requests;
                    this._toastService.success('Friend request sent successfully');
                },
                error: () => {
                    this._toastService.error('Error sending friend request');
                },
            });
    }
}
