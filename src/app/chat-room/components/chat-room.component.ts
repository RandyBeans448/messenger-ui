import { ChangeDetectorRef, Component } from "@angular/core";
import { WebSocketService } from "../../shared/services/web-socket.service";
import { ChatService } from "../../shared/services/chat.service";
import { ActivatedRoute } from "@angular/router";
import { MessageNamespace } from "../../shared/namespaces/messages.namespace";
import { AccountService } from "../../shared/services/account.service";
import { AccountNamespace } from "../../shared/namespaces/account.namespace";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent {

    public messages: MessageNamespace.MessageInterface[] = [];
    public receivedMessage: string = '';
    public conversation: any;
    public user: BehaviorSubject<AccountNamespace.AccountInterface>;

    constructor(
        private _websocketService: WebSocketService,
        private _chatService: ChatService,
        private _accountService: AccountService,
        private _activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.user = await this._accountService.getAccount();

        this._activatedRoute.params.subscribe(params => {

            this._chatService.getConversationById(params['conversationId']).subscribe((data: any) => {
                this.conversation = data;
                this.messages = data.messages;
            });
        });

        this._websocketService.receiveMessage().subscribe((message: MessageNamespace.MessageInterface) => {
            console.log('-----------------------------------------')
            this.messages.push(message);
            console.log(message)
            this.cdr.detectChanges();
        });
    }

    public async sendMessage(message: MessageNamespace.MessageInterface): Promise<void> {
        message.senderId = this.user.value.user.id;
        this._websocketService.sendMessage(message);

    }
}