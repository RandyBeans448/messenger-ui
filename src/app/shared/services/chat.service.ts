import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WebSocketService } from "./web-socket.service";
import { catchError, Observable } from "rxjs";
import { AppConfigService } from "../../../environments/services/config.service";

@Injectable({
    providedIn: 'root',
})
export class ChatService {

    public baseApi: string = AppConfigService.env.baseApi;

    constructor(
        private socket: WebSocketService,
        private http: HttpClient,
        private _http: HttpClient,
    ) { }

    public getConversationById(id: string): Observable<Object> {
        console.log(`${this.baseApi}/conversations/${id}`, 'getConversationById')
        return this._http
            .get(`${this.baseApi}/conversations/${id}`)
            .pipe(
                catchError((error) => {
                    throw error;
                })
            );
    }
}