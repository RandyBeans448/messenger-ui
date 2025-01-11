import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './components/chat-room.component';
import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatBarComponent } from '../shared/components/chat-bar/chat-bar.component';
import { ButtonComponent } from "../shared/components/button/button.component";
import { SimpleSearchBarComponent } from "../shared/components/simple-search-bar/simple-search-bar.component";
import { DropdownComponent } from '../shared/components/dropdown/dropdown.component';

@NgModule({
    declarations: [
        ChatRoomComponent,
    ],
    imports: [
        CommonModule,
        ChatRoomRoutingModule,
        ChatBarComponent,
        ButtonComponent,
        SimpleSearchBarComponent,
        DropdownComponent,
    ],
    providers: [],
})
export class ChatRoomModule { }
