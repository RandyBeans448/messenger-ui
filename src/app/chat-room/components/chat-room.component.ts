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
    public sharedSecret: string = '';

    constructor(
        private _websocketService: WebSocketService,
        private _accountService: AccountService,
        private _activatedRoute: ActivatedRoute,
        private _cryptoService: CryptoService,
    ) {}

    async ngOnInit(): Promise<void> {
        await this._websocketService.handleConnection(this._activatedRoute.snapshot.params['conversationId']);

        this.user = await this._accountService.getAccount();
        console.log(this.user.value.user.id)

        this._activatedRoute.params.subscribe(params => {

            this._websocketService.getConversationById(params['conversationId']).subscribe((data: any) => {
                this.conversation = data;

                console.log(this.conversation.friend[0].cryptoKey.sharedSecret)
                console.log(this.conversation.friend[1].cryptoKey.sharedSecret)

                this.sharedSecret = this.conversation.friend[0].name === this.user.value.user.username ? this.conversation.friend[0].cryptoKey.sharedSecret : this.conversation.friend[1].cryptoKey.sharedSecret;

                this.messages = data.messages.map((message: MessageNamespace.MessageInterface) => {
                    const decryptedMessage = this._cryptoService.decryptMessage(message.message, this.sharedSecret);
                    message.message = decryptedMessage.message;
                    return message;
                });

                this._websocketService.receiveMessage(this.sharedSecret).subscribe((message: MessageNamespace.MessageInterface) => {
                    this.messages.push(message);
                });
            });
        });
    }

    ngOnAfterViewInit() {
   
    }

    ngOnDestroy() {
        this._websocketService.handleDisconnection();
    }

    public async sendMessage(message: MessageNamespace.SendMessageInterface): Promise<void> {
        message.senderId = this.user.value.user.id;
        message.conversation = this.conversation;
        this._websocketService.sendMessage(message, this.sharedSecret);
    }
}