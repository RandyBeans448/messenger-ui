import { CommonModule, DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
// import { AvatarComponent, BadgeComponent, ButtonComponent, IconComponent, PopoverComponent, PopoverListItemComponent } from "@scaffoldbid/ui/components";
// import { HOMEPAGE_ROUTE } from "@scaffoldbid/ui/const";
// import { AccountNamespace, DesignNamespace } from "@scaffoldbid/ui/interfaces";
// import { AccountService, ResponderService, TopBarService } from "@scaffoldbid/ui/services";
// import { TextUtils } from "@scaffoldbid/ui/utils";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AccountService } from "../../shared/services/account.service";
import { AccountNamespace } from "../../shared/namespaces/account.namespace";

@Component({
    selector: 'app-top-banner',
    standalone: true,
    imports: [
        // AvatarComponent,
        CommonModule,
        // IconComponent,
        // BadgeComponent,
        // PopoverComponent,
        // PopoverListItemComponent,
        // DatePipe,
        // ButtonComponent,
    ],
    templateUrl: './top-banner.component.html',
    styleUrls: ['./top-banner.component.scss'],
})
export class TopBannerComponent {

    @Input()
    public marginTop: string = '0';

    // public HOMEPAGE_ROUTE = HOMEPAGE_ROUTE;
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
          this.name = `${account.user.firstName} ${account.user.lastName}`;
          this.email = `${account.user.email}`;
        });
    }

    public ngOnDestroy(): void {

    }

    public closeMenu(): void {
        let menuOption: HTMLElement = document.getElementById('dropdown') as HTMLElement;
        menuOption.removeAttribute("open");
    }

    public navigateTo(command: string): void {
        this._router.navigate([command]);
    }
}
