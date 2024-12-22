import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-input',
    imports: [CommonModule],
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent {

    @Input()
    public title: string = '';

}