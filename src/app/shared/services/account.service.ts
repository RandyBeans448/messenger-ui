import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TopBarService } from './top-bar.service';
import { UserNamespace } from '../namespaces/user.interface';
import { AppConfigService } from '../../../environments/services/config.service';
import { AccountNamespace } from '../namespaces/account.namespace';
import { FriendRequestNamespace } from '../namespaces/friend-request.namespace';

@Injectable({
    providedIn: 'root',
})
export class AccountService {

    public userInitObject: UserNamespace.UserInterface = {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        friend: [],
        friendRequests: [],
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

    public getAccountInformationFromServer(): Observable<any> {
        return this._http
            .get<UserNamespace.UserInterface>(`${this.baseApi}/user`)
            .pipe(
                tap((user: UserNamespace.UserInterface) => {
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

    public getAviableUsers(): Observable<any> {
        return this._http
            .get(`${this.baseApi}/user/get-all-users-with-no-pending-requests`)
            .pipe(
                catchError((error) => {
                    throw error;
                })
            );
    }

    public getReceivedFriendRequests(): Observable<any> {
        return this._http
            .get<FriendRequestNamespace.FriendRequestDTOInterface[]>(`${this.baseApi}/friend-request/get-received-friend-requests`)
            .pipe(
                map((requests: FriendRequestNamespace.FriendRequestDTOInterface[]) => {
                    return requests.map((request) => {
                        return {
                            receiver: {
                                id: request.friendRequest_receiverId,
                                friendRequestId: request.friendRequest_id,
                                username: request.requestSentBy_username,
                                createdAt: request.requestSentBy_createdAt,
                                updatedAt: request.requestSentBy_updatedAt,
                                deletedAt: request.requestSentBy_deletedAt,
                            }

                        };
                    });
                }),
                catchError((error) => {
                    return error;
                })
            );
    }
}
