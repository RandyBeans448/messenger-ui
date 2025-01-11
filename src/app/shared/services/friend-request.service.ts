import { Injectable } from "@angular/core";
import { FriendRequestNamespace } from "../namespaces/friend-request.namespace";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable } from "rxjs";
import { AppConfigService } from "../../../environments/services/config.service";

@Injectable({
    providedIn: 'root',
})
export class FriendRequestService {

    constructor(
        private _http: HttpClient,
        private _toastService: ToastrService
    ) { }

    public baseApi: string = AppConfigService.env.baseApi;

    public sendFriendRequest(userId: string): Observable<string> {
        return this._http.post(`${this.baseApi}/friend-request/add-friend`, { newFriendId: userId }, {
            responseType: 'text',
        }).pipe(
            catchError((error) => {
                this._toastService.error(
                    error
                );
                throw error;
            })
        );
    }

    public respondToFriendRequest(response: FriendRequestNamespace.FriendRequestResponseInterface): Observable<any> {
        return this._http.patch(`${this.baseApi}/friend-request/resolve-friend-request`, response).pipe(
            catchError((error) => {
                this._toastService.error(
                    error
                );
                throw error;
            })
        );
    };
}