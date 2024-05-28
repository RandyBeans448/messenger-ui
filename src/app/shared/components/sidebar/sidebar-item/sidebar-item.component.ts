import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { IconComponent } from "../../icon/icon.component";
import { Component } from "@angular/core";

@Component({
    selector: 'app-sidebar-item',
    standalone: true,
    imports: [CommonModule, RouterModule, IconComponent],
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent {
    
}