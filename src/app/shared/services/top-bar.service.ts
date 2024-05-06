import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfigService } from '../../../environments/services/config.service';


@Injectable({
    providedIn: 'root',
})
export class TopBarService {

    public baseApi: string = AppConfigService.env.baseApi;
    public topInfoBar: BehaviorSubject<TopBarConfig> = new BehaviorSubject<TopBarConfig>({ show: false, message: '' });

    constructor(
        // private _modalService: ModalService,
        private _http: HttpClient
    ) { }

    public setMessages(message: string): void {
        this.topInfoBar.next({ show: true, message });
    }

    public hideTopBar(): void {
        this.topInfoBar.next({ show: false, message: this.topInfoBar.value.message });
    }

    public showTopBar(): void {
        this.topInfoBar.next({ show: true, message: this.topInfoBar.value.message });
    }

}

export interface TopBarConfig {
    show: boolean;
    message: string;
}