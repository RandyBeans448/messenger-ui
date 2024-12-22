import { CommonModule } from "@angular/common";
import { Component, HostListener, Input } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthModule, AuthService } from "@auth0/auth0-angular";
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
    imports: [
        CommonModule,
        RouterModule,
        SidebarItemComponent,
        AuthModule,
    ],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
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

    public sideBarSignOut: SidebarNamespace.ItemInterface = {
        icon: 'sign_out',
        label: 'Sign out',
        function: () => this._authService.logout(),
    }

    public disabledCollapsedButton: boolean = false;

    private _destroyed$: Subject<void> = new Subject<void>();

    @HostListener("window:resize", [])
    private onResize(): void {
        this.detectScreenSize();
    }

    constructor(
        public responderService: ResponderService,
        private _accountService: AccountService,
        private _router: Router,
        private _authService: AuthService,
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
        
        this.detectScreenSize();
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

    private detectScreenSize(): void {

        if (window.innerWidth < 1500) {
            this.responderService.collapseSideBar();
            return;
        }

        this.responderService.openSideBar();
    }
}