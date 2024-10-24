import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthModule } from "@auth0/auth0-angular";
import { ButtonComponent } from "../button/button.component";
import { IconComponent } from "../icon/icon.component";
import { SidebarItemComponent } from "./sidebar-item/sidebar-item.component";
import { AccountService } from "../../services/account.service";
import { FriendNamespace } from "../../namespaces/friend.namespace";
import { FriendComponent } from "../../friend/friend.component";
import { InputComponent } from "../input/input.component";
import { FriendRequestsCardComponent } from "../../friend-request/friend-request-card.component";
import { SidebarAddFriendComponent } from "./sidebar-add-friend/sidebar-add-friend.component";
import { UserNamespace } from "../../namespaces/user.interface";
import { Subject, takeUntil } from "rxjs";
import { ResponderService } from "../../services/responder.service";
import { SidebarNamespace } from "./namespaces/sidebar.namespace";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
        InputComponent,
        FriendComponent,
        RouterModule,
        SidebarItemComponent,
        AuthModule,
        ButtonComponent,
        FriendRequestsCardComponent,
        SidebarAddFriendComponent
    ],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

    @Input()
    public sidebarFriendItems: FriendNamespace.FriendArrayItemInterface[];

    public findMyFriendsSearchForFriends: string = 'searchFriends';

    public usersThatHaveNotBeenFriended: any[] = [];

    public user: UserNamespace.UserInterface;

    public sideBarToggleMenuButton: SidebarNamespace.ItemInterface = {
        icon: 'toggle_menu',
        label: 'Toggle Menu',
    };

    public sideBarAccountPage: SidebarNamespace.ItemInterface = {
        icon: 'home',
        label: 'Account Page',
        function: () => this._router.navigate(['/home']),
    }

    private _destroyed$: Subject<void> = new Subject<void>();

    constructor(
        public responderService: ResponderService,
        private _accountService: AccountService,
        private _router: Router,
    ) {}

    public ngOnInit() {
        this._accountService.getAccount().pipe(
            takeUntil(this._destroyed$)
        )
        .subscribe(account => {
            this.user = account.user;
            this.sidebarFriendItems = account.user.friend;
        });

        this._accountService.getAvailableUsers().pipe(
            takeUntil(this._destroyed$)
        ).subscribe(friends => {
            this.usersThatHaveNotBeenFriended = friends;
        });
    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public toggleSidebar(): void {
        this.responderService.toggleSideBar();
    }

    public toggleSearch(searchToggle: string): void {
        this.findMyFriendsSearchForFriends = searchToggle;
    }

    public findMyFriends(searchQuery: string): void {

    }

    public searchFriends(searchQuery: string): void {

    }

    public toChatRoom(
        conversationId: string,
    ): void {
        this._router.navigate([`/chat-room/${conversationId}`]);
    }

}