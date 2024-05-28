import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthModule } from "@auth0/auth0-angular";
import { ButtonComponent } from "../button/button.component";
import { IconComponent } from "../icon/icon.component";
import { SidebarItemComponent } from "./sidebar-item/sidebar-item.component";
import { AccountService } from "../../services/account.service";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
        RouterModule,
        SidebarItemComponent,
        AuthModule,
        ButtonComponent,
    ],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

    constructor(private _accountService: AccountService) {

    }

}