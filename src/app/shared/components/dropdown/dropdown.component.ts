import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { SimpleSearchBarComponent } from '../simple-search-bar/simple-search-bar.component';
import { DropdownNamespace } from './interfaces/dropdown.interface';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SimpleSearchBarComponent,
        ReactiveFormsModule,
    ],
})
export class DropdownComponent {
    @Input()
    options: DropdownNamespace.OptionInterface[] = [];

    @Input()
    dropdownWidth: string = '100%';

    @Input()
    searchable: boolean = false;

    @Input()
    dropdownForm: FormGroup = new FormGroup({});

    @Input()
    label: string;

    @Input()
    canMultiSelect: boolean = false;

    @Output()
    optionSelected: EventEmitter<DropdownNamespace.OutputInterface> = new EventEmitter<DropdownNamespace.OutputInterface>();

    @Output()
    clickedOutside: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    searchValue: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('dbDropdown')
    public dbDropdown: ElementRef<any>;

    @ViewChild('searchBar')
    public searchBar: SimpleSearchBarComponent;

    public selectedOption: DropdownNamespace.OptionInterface;

    public selectedOptions: DropdownNamespace.OptionInterface[] = [];

    private _destroyed$: Subject<void> = new Subject();

    @HostListener('document:click', ['$event'])
    clickOutside(event: any) {
        if (!this.eRef.nativeElement.contains(event.target) && !this.dbDropdown.nativeElement.classList.contains('hidden')) {
            this.closeDropdown();
            this.clickedOutside.emit(false);
        }
    }

    constructor(private eRef: ElementRef) { }

    public ngOnInit(): void {

        if (this.searchable) {
            this.emitSearchTerm('');
        }
    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete()
    }

    public selectOption(
        clickEvent: MouseEvent | PointerEvent,
        option: DropdownNamespace.OptionInterface,
    ): void {
        this.selectedOption = option;
        this.optionSelected.emit({
            data: option,
            event: clickEvent,
        });
        this.closeDropdown();
    }

    public selectMultipleOptions(
        clickEvent: MouseEvent | PointerEvent,
        selectedOption: DropdownNamespace.OptionInterface,
    ): void {
        this.selectedOptions.push(selectedOption);
        this.optionSelected.emit({
            event: clickEvent,
            data: selectedOption,
        });
    }

    public toggleDropdown() {
        this.dbDropdown.nativeElement.classList.toggle('hidden');
    }

    public closeDropdown() {
        this.dbDropdown.nativeElement.classList.add('hidden');

        if (this.searchable) {
            this.searchBar.clearForm();
        }
    }

    public emitSearchTerm(inputData: string): void {
        this.searchValue.emit(inputData);
    }
}