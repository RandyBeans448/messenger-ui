import { CommonModule } from "@angular/common";
import { Component, HostBinding } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { TopBarService, TopBarConfig } from "../../shared/services/top-bar.service";

@Component({
    selector: 'app-top-info-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './top-info-bar.component.html',
    styleUrls: ['./top-info-bar.component.scss'],
})
export class TopInfoBarComponent {

    @HostBinding('class.hidden')
    showBarHidden: boolean = true;

    constructor(private _topInfoBarService: TopBarService) { }

    public getTopBarUpdates(): Observable<TopBarConfig> {
        return this._topInfoBarService.topInfoBar.pipe(tap((topBar: TopBarConfig) => {
            this.showBarHidden = !topBar.show;
        }));
    }
}
