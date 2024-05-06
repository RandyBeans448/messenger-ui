import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { AccountNamespace } from '../interfaces/account.interface';

@Injectable({
    providedIn: 'root',
})
export class AccountResolver {

    constructor(private _accountService: AccountService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountNamespace.AccountInterface> {

        return this._accountService.getAccount().pipe(
            take(1),
            switchMap(accountBehavior => {
                const account: AccountNamespace.AccountInterface = accountBehavior;
                if (account && account.user.id === '') {
                    // If account is not populated, fetch from server and then return the BehaviorSubject.
                    return this._accountService.getAccountInformationFromServer().pipe(
                        switchMap(() => of(accountBehavior))
                    );
                } else {
                    // If account is populated, just return the BehaviorSubject.
                    return of(accountBehavior);
                }
            })
        );
    }
}