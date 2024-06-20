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
    ],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

    @Input()
    public sidebarItems: FriendNamespace.FriendArrayItemInterface[];

    public findMyFriendsSearchForFriends: 'findMyFriend' | 'searchFriends' = 'findMyFriend';

    constructor(private _accountService: AccountService) {

    }

    public ngOnInit() {
        this._accountService.getAccount().subscribe(account => {
            this.sidebarItems = account.user.friend;
        });
    }

}