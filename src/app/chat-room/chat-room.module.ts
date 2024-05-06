import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './components/chat-room.component';
import { ChatRoomRoutingModule } from './chat-room-routing.module';

@NgModule({
    declarations: [
        ChatRoomComponent,
    ],
    imports: [
        CommonModule,
        ChatRoomRoutingModule
    ],
    providers: [
    ],
})
export class ChatRoomModule { }
