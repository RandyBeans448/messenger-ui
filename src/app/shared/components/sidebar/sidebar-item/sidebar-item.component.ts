import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';
import { SidebarNamespace } from '../namespaces/sidebar.namespace';


@Component({
    selector: 'app-sidebar-item',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        IconComponent,
    ],
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent {

    @Input()
    public set sideBarItem(value: SidebarNamespace.ItemInterface) {
        this._sidebarItem = value;
        this._selectTemplate();
        this.cdr.detectChanges();
    }

    public get sideBarItem(): SidebarNamespace.ItemInterface {
        return this._sidebarItem;
    }

    @Input()
    public currentPath: string;

    @Input()
    public collapsed: boolean = false;

    @Input()
    public disabled: boolean = false;

    @ViewChild('disabledTemplate')
    public disabledTemplate: TemplateRef<any>;

    @ViewChild('functionTemplate')
    public functionTemplate: TemplateRef<any>;

    @ViewChild('linkTemplate')
    public linkTemplate: TemplateRef<any>;

    @ViewChild('externalLinkTemplate')
    public externalLinkTemplate: TemplateRef<any>;

    @ViewChild('buttonTemplate')
    public buttonTemplate: TemplateRef<any>;

    public selectedTemplate: TemplateRef<any>;

    private _sidebarItem: SidebarNamespace.ItemInterface;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        console.log(this.sideBarItem)
    }

    ngAfterViewChecked() {
        this._selectTemplate();
        this.cdr.detectChanges();
    }

    private _selectTemplate() {
        if (this.sideBarItem.disabled) {
            this.selectedTemplate = this.disabledTemplate;
            return;
        }

        if (this.sideBarItem.link) {
            if (this.sideBarItem.link.startsWith('http')) {
                this.selectedTemplate = this.externalLinkTemplate;
                return;
            }
            this.selectedTemplate = this.linkTemplate;
            return;
        }

        if (this.sideBarItem.function) {
            this.selectedTemplate = this.functionTemplate;
            return;
        }
        this.selectedTemplate = this.buttonTemplate;
    }
}
