import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TopBannerComponent } from '../top-banner/top-banner.component';
import { TopInfoBarComponent } from '../top-info-bar/top-info-bar.component';
import { TopBarService } from '../../shared/services/top-bar.service';

@Component({
    selector: 'app-shell',
    standalone: true,
    imports: [CommonModule, TopBannerComponent, TopInfoBarComponent],
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
    constructor(private _topBarService: TopBarService) { }

    public topBarIsShowing(): Observable<boolean> {
        return this._topBarService.topInfoBar.pipe(map(topBar => {
            return topBar.show;
        }));
    }
}
