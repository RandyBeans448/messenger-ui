import { CommonModule,} from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "../../shared/services/account.service";
import { AccountNamespace } from "../../shared/namespaces/account.namespace";

@Component({
    selector: 'app-top-banner',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './top-banner.component.html',
    styleUrls: ['./top-banner.component.scss'],
})
export class TopBannerComponent {

    @Input()
    public marginTop: string = '0';

    public accountData$: Observable<AccountNamespace.AccountInterface>;
    public name: string = '';
    public email: string = '';

    constructor(
        private _accountService: AccountService,
        private _router: Router,
    ) {
        this.accountData$ = this._accountService.getAccount();
    }

    ngOnInit() {
        this.accountData$.subscribe(account => {
          this.name = `${account.user.username}`
          this.email = `${account.user.email}`;
        });
    }

    public closeMenu(): void {
        let menuOption: HTMLElement = document.getElementById('dropdown') as HTMLElement;
        menuOption.removeAttribute("open");
    }

    public navigateTo(command: string): void {
        this._router.navigate([command]);
    }
}
