import { Injectable } from '@angular/core';
import { DeviceDetectorService as DTS } from 'ngx-device-detector';

export type DeviceType = 'mobile' | 'desktop' | 'tablet';

@Injectable({
    providedIn: 'root',
})
export class DeviceDetectorService {

    constructor(private _dts: DTS) { }

    public getDeviceType(): DeviceType {
        switch (this._dts.getDeviceInfo().deviceType) {
            case 'mobile':
                return 'mobile';
            case 'tablet':
                return 'tablet';
            default:
                return 'desktop';
        }
    }
}
