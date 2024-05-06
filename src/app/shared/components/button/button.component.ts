import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { IconComponent, IconType } from "../icon/icon.component";

export type ButtonType = 'text' | 'primary' | 'outline' | 'underline' | 'dropdown'
    | 'primary-alternative' | 'outline-alternative' | 'underline-alternative'
    | 'primary-round' | 'alternative-round' | 'outline-round' | 'outline-alternative-round' | 'dropdown-round';

export type ButtonSize = 'small' | 'regular' | 'large';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
    ],
})
export class ButtonComponent {

    @Input()
    title: string = '';

    @Input()
    @HostBinding('class.w-full')
    isFullWidth: boolean = false;

    @Input()
    disabled: boolean | undefined = false;

    @Input()
    animate: boolean = false;

    @Input()
    loading: boolean = false;

    @Input()
    buttonType: ButtonType | null = 'primary';

    @Input()
    buttonSize: ButtonSize = 'regular';

    @Input()
    iconType: IconType | null = null;

    @Input()
    iconTypeTwo: IconType | null = null;

    @Input()
    iconFilled: boolean = false;

    @Input()
    iconSize: string = '1.5rem';

    @Input()
    clicked: boolean = false;

    @Input()
    clickAction: Function | null = null;

    public isRound: boolean = false;

    constructor() { }

    ngOnInit() {
        if (this.buttonType?.includes('-round')) {
            this.isRound = true;
            this.buttonType = this.buttonType?.replace('-round', '') as ButtonType;
        }
    }

    public toggleClicked() {
        this.clicked = !this.clicked;
    }

    public handleClick(): void {
        if (this.clickAction) {
            this.clickAction(this);
        }
    }

}
