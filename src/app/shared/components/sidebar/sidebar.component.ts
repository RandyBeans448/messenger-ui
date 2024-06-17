import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthModule } from "@auth0/auth0-angular";
import { ButtonComponent } from "../button/button.component";
import { IconComponent } from "../icon/icon.component";
import { SidebarItemComponent } from "./sidebar-item/sidebar-item.component";
import { AccountService } from "../../services/account.service";
import { FriendNamespace } from "../../namespaces/friend.namespace";
import { AccountNamespace } from "../../namespaces/account.namespace";
import { Observable } from "rxjs";
import { FriendComponent } from "../../friend/friend.component";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
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

    constructor(private _accountService: AccountService) {

    }

    public ngOnInit() {
        this._accountService.getAccount().subscribe(account => {
            this.sidebarItems = account.user.friend;
            console.log(account.user.friend, 'fick');
        });
    }

}