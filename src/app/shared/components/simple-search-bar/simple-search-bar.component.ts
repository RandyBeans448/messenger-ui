import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subject, identity } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-simple-search-bar',
    templateUrl: './simple-search-bar.component.html',
    styleUrls: ['./simple-search-bar.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})

export class SimpleSearchBarComponent {

    @Input()
    public clicked: boolean = false;

    @Input()
    public placeholder: string = "Search...";

    @Input()
    public needsDebounce: boolean = false;

    @Output()
    public inputFocused: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output()
    public clickedOutside: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    public valueEmitted: EventEmitter<string> = new EventEmitter<string>();

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: any) {
        if (!this._elementRef.nativeElement.contains(event.target)) {
            this.clickedOutside.emit(true);
        }
    }

    public inputControl: FormControl<string> = new FormControl('', { nonNullable: true });

    private _destroyed$: Subject<void> = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
    ) { }

    public ngOnInit(): void {
        this.inputControl
            .valueChanges
            .pipe(
                this.needsDebounce ? debounceTime(300) : identity,
                takeUntil(this._destroyed$),
            )
            .subscribe((value: string) => {
            this.valueEmitted.emit(value);
        });
        
    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public toggleClicked(clicked: boolean): void {
        this.clicked = clicked;
    }

    public clearForm(): void {
        this.inputControl.reset();
    }

    public onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }
    }

    public onInputFocused(event: FocusEvent): void {
        this.inputFocused.emit(event);
    }
}