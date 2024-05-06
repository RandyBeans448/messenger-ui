import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TopBarService } from './top-bar.service';
import { UserNamespace } from '../interfaces/user.interface';
import { AppConfigService } from '../../../environments/services/config.service';
import { AccountNamespace } from '../interfaces/account.interface';

@Injectable({
    providedIn: 'root',
})
export class AccountService {

    public userInitObject: UserNamespace.UserInterface = {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        friends: [],
        updatedAt: '',
        createdAt: '',
        deletedAt: null,
    };

    public initObject: AccountNamespace.AccountInterface = {
        user: this.userInitObject,
    }
    public baseApi: string = AppConfigService.env.baseApi;
    private _account: BehaviorSubject<AccountNamespace.AccountInterface> = new BehaviorSubject<AccountNamespace.AccountInterface>(this.initObject);

    constructor(
        private _http: HttpClient,
        private _authService: AuthService,
        // private _toastService: ToastrService,
        // private _modalService: ModalService,
        private _topBarService: TopBarService
    ) { }

    // public hasPermission(permission: AccountNamespace.PermissionType): boolean {
    //     const account: AccountNamespace.AccountInterface = this._account.getValue();
    //     return account.user.permissions.includes(permission);
    // }

    public getPaymentLink(): Observable<any> {
        return this._http.post(`${this.baseApi}/company/payment-link`, {});
    }

    public getManageBillingLink(): Observable<any> {
        return this._http.post(`${this.baseApi}/company/manage-billing-link`, {});
    }

    public getAccountInformationFromServer(): Observable<any> {
        return this._http
            .get<UserNamespace.UserInterface>(`${this.baseApi}/user`)
            .pipe(
                tap((user) => {
                    console.log(user)
                    return this.setAccount(user);
                }),
                catchError((error) => {
                    // this._toastService.error('User could not be found');
                    this._authService.logout();
                    this.clearData();
                    return error;
                })
            );

    }

    public setAccount(user: UserNamespace.UserInterface): AccountNamespace.AccountInterface {
        const account: AccountNamespace.AccountInterface = { user };
        this._account.next(account);
        return account;
    }

    public getAccount(): BehaviorSubject<AccountNamespace.AccountInterface> {
        return this._account;
    }

    public updatePassword(): Observable<any> {
        return this._http
            .patch(`${this.baseApi}/user/password`, {})
            .pipe(
                catchError((error) => {
                    throw error;
                })
            );
    }

    public clearData(): void {
        this._account.next(this.initObject);
    }
}
