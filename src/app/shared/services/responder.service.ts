import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService, DeviceType } from './device-detector.service';

@Injectable({
    providedIn: 'root',
})
export class ResponderService {

    public sidebarIsCollapsed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public mobileSize: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public mobileLandscape: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public deviceType: BehaviorSubject<DeviceType> = new BehaviorSubject<DeviceType>('desktop');

    constructor(private _dds: DeviceDetectorService) {
        this.deviceType.next(this._dds.getDeviceType());
    }

    public toggleSideBar(): void {
        this.sidebarIsCollapsed.next(!this.sidebarIsCollapsed.value);
    }

    public collapseSideBar(): void {
        this.sidebarIsCollapsed.next(true);
    }

    public openSideBar(): void {
        this.sidebarIsCollapsed.next(false);
    }

    public setMobileMenu(value: boolean): void {
        this.mobileSize.next(value);
    }

    public mobileIsLandscape(value: boolean): void {
        this.mobileLandscape.next(value);
    }
}
