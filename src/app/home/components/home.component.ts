import { Component } from "@angular/core";
import { AccountService } from "../../shared/services/account.service";
import { UserNamespace } from "../../shared/namespaces/user.interface";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    constructor(private _accountService: AccountService) { }

    public user: UserNamespace.UserInterface;

    public receivedFriendRequests: any = [];

    ngOnInit() {
        this._accountService.getAccount().subscribe(account => {
            this.user = account.user;
        });
        this._accountService.getReceivedFriendRequests().subscribe(requests => {
            this.receivedFriendRequests = requests;
        });
    }
}