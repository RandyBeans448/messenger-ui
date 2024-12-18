import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: true,
})

export class SpinnerComponent {
    @Input()
    public width: string = '24px';
}