import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './components/chat-room.component';
import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatBarComponent } from '../shared/components/chat-bar/chat-bar.component';

@NgModule({
    declarations: [
        ChatRoomComponent,
    ],
    imports: [
        CommonModule,
        ChatRoomRoutingModule,
        ChatBarComponent,
    ],
    providers: [
    ],
})
export class ChatRoomModule { }
