import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AuthModule } from "@auth0/auth0-angular";
import { ButtonComponent } from "../../button/button.component";
import { IconComponent } from "../../icon/icon.component";
import { AvatarComponent } from "../../avatar/avatar.component";

@Component({
    selector: 'app-sidebar-add-friend',
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
        AuthModule,
        ButtonComponent,
        AvatarComponent
    ],
    templateUrl: './sidebar-add-friend.component.html',
    styleUrls: ['./sidebar-add-friend.component.scss'],
})
export class SidebarAddFriendComponent {

    @Input()
    public user: any;

}