import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AvatarComponent } from "../components/avatar/avatar.component";
import { ButtonComponent } from "../components/button/button.component";
import { FriendNamespace } from "../namespaces/friend.namespace";


@Component({
    selector: 'app-friend',
    templateUrl: './friend.component.html',
    styleUrls: ['./friend.component.scss'],
    standalone: true,
    imports: [CommonModule, AvatarComponent],
})
export class FriendComponent {

    @Input()
    public friendArrayItem: FriendNamespace.FriendArrayItemInterface;

}