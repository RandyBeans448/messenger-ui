import { Injectable } from "@angular/core";
import { FriendRequestNamespace } from "../interfaces/friend-request.interface";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs";
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

    public respondToFriendRequest(repsonse: FriendRequestNamespace.FriendRequestResponseInterface) {
        return this._http.patch(`${this.baseApi}/friend-request/resolve-friend-request`, repsonse, {
            responseType: 'text',
        }).pipe(
            catchError((error) => {
                console.log(error)
                this._toastService.error(
                    error
                );
                throw error;
            })
        );
    };
}