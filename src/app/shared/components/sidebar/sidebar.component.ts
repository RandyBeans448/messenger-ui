import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthModule } from "@auth0/auth0-angular";
import { ButtonComponent } from "../button/button.component";
import { IconComponent } from "../icon/icon.component";
import { SidebarItemComponent } from "./sidebar-item/sidebar-item.component";
import { AccountService } from "../../services/account.service";
import { FriendNamespace } from "../../namespaces/friend.namespace";
import { FriendComponent } from "../../friend/friend.component";
import { InputComponent } from "../input/input.component";
import { SimpleSearchBarComponent } from "../simple-search-bar/simple-search-bar.component";
import { FriendRequestsCardComponent } from "../../friend-request/friend-request-card.component";
import { SidebarAddFriendComponent } from "./sidebar-add-friend/sidebar-add-friend.component";


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
        SimpleSearchBarComponent,
        FriendRequestsCardComponent,
        SidebarAddFriendComponent
    ],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

    @Input()
    public sidebarItems: FriendNamespace.FriendArrayItemInterface[];

    public findMyFriendsSearchForFriends: 'findMyFriend' | 'searchFriends' = 'findMyFriend';

    public usersThatHaveNotBeenFriended: any[] = [];

    constructor(private _accountService: AccountService) {
        
    }

    public ngOnInit() {
        this._accountService.getAccount().subscribe(account => {
            this.sidebarItems = account.user.friend;
        });

        this._accountService.getAviableUsers().subscribe(friends => {
            this.usersThatHaveNotBeenFriended = friends;
        });
    }

    public toggleSearch(): void {
        this.findMyFriendsSearchForFriends = this.findMyFriendsSearchForFriends === 'findMyFriend' ? 'searchFriends' : 'findMyFriend';
    }

    public findMyFriends(searchQuery: string): void {

    }

    public searchFriends(searchQuery: string): void {

    }

}