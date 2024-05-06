import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { IconComponent } from '../shared/components/icon/icon.component';
import { ButtonComponent } from '../shared/components/button/button.component';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        ButtonComponent,
        IconComponent,
        CommonModule,
        HomeRoutingModule
    ],
    providers: [
    ],
})
export class HomeModule { }
