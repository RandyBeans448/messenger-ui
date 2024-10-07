import { Component } from "@angular/core";
import { WebSocketService } from "../../shared/services/web-socket.service";
import { ActivatedRoute } from "@angular/router";
import { MessageNamespace } from "../../shared/namespaces/messages.namespace";
import { AccountService } from "../../shared/services/account.service";
import { AccountNamespace } from "../../shared/namespaces/account.namespace";
import { BehaviorSubject } from "rxjs";
import { CryptoService } from "../../shared/services/crypto.service";

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
    public sharedSecret: string;

    constructor(
        private _websocketService: WebSocketService,
        private _accountService: AccountService,
        private _activatedRoute: ActivatedRoute,
        private _cryptoService: CryptoService,
    ) {}

    async ngOnInit(): Promise<void> {
        await this._websocketService.handleConnection(this._activatedRoute.snapshot.params['conversationId']);

        this.user = await this._accountService.getAccount();
        this.sharedSecret = await this._websocketService.getSharedSecret();

        this._activatedRoute.params.subscribe(params => {
            this._websocketService.getConversationById(params['conversationId']).subscribe((data: any) => {
                console.log(data, '<----------- this is the conversation');
                this.conversation = data;
                this.sharedSecret = this._websocketService.getSharedSecret();

                this.messages = data.messages.map((message: MessageNamespace.MessageInterface) => {
                    const decryptedMessage = this._cryptoService.decryptMessage(message.message, this.sharedSecret);
                    message.message = decryptedMessage.message;
                    return message;
                });

                console.log(this.messages, '<----------- this is the messages');
            });
        });

        this._websocketService.receiveMessage().subscribe((message: MessageNamespace.MessageInterface) => {
            this.messages.push(message);
        });
    }

    public async sendMessage(message: MessageNamespace.MessageInterface): Promise<void> {
        message.senderId = this.user.value.user.id;
        this._websocketService.sendMessage(message);
    }
}