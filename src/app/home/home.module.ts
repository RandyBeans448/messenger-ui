import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { IconComponent } from '../shared/components/icon/icon.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { FriendRequestsCardComponent } from '../shared/friend-request/friend-request-card.component';
import { FriendComponent } from '../shared/friend/friend.component';
import { SidebarAddFriendComponent } from '../shared/components/sidebar/sidebar-add-friend/sidebar-add-friend.component';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        ButtonComponent,
        IconComponent,
        FriendComponent,
        SidebarAddFriendComponent,
        FriendRequestsCardComponent,
        CommonModule,
        HomeRoutingModule
    ],
    providers: [
    ],
})
export class HomeModule { }