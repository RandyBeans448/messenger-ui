import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable } from "rxjs";
import { AppConfigService } from "../../../environments/services/config.service";

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    constructor(
        private _http: HttpClient,
        private _toastService: ToastrService
    ) {}

    public baseApi: string = AppConfigService.env.baseApi;

    public getLanguage(searchQuery: string): Observable<Object>{
        return this._http.post(`${this.baseApi}/conversations/find-language`, { searchQuery }).pipe(
            catchError((error) => {
                this._toastService.error(
                    error
                );
                throw error;
            })
        );
    }
}