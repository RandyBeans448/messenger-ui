import { Component } from "@angular/core";
import { AccountService } from "../../shared/services/account.service";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { AccountNamespace } from "../../shared/namespaces/account.namespace";
import { Router,} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    constructor(
        private _accountService: AccountService,
        private _router: Router,
    ) { }

    public user: BehaviorSubject<AccountNamespace.AccountInterface>;

    public friends: any;

    public receivedFriendRequests: any = [];

    public usersThatHaveNotBeenFriended: any[] = [];

    private _destroyed$: Subject<void> = new Subject<void>();

    ngOnInit() {
        this.user = this._accountService.getAccount();
        this.friends = this.user.value.user.friend;

        this._accountService.getReceivedFriendRequests()
        .pipe(
            takeUntil(this._destroyed$),
        ).subscribe(requests => {
            this.receivedFriendRequests = requests;
        });

        this._accountService.getAvailableUsers().pipe(
            takeUntil(this._destroyed$)
        ).subscribe(friends => {
            this.usersThatHaveNotBeenFriended = friends;
        });

        console.log(this.user.value.user.friend);
    }

    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    onUpdateAccount(): void {
        // Implement your update logic here, for example, open a modal or navigate to another page
        console.log('Update Account button clicked');
        // You can call the update service or open an update form modal
    }

    public toChatRoom(
        conversationId: string,
    ): void {
        this._router.navigate([`/chat-room/${conversationId}`]);
    }
}