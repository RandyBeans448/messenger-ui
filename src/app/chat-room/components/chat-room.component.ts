import { Component, ElementRef, ViewChild } from "@angular/core";
import { WebSocketService } from "../../shared/services/web-socket.service";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { MessageNamespace } from "../../shared/namespaces/messages.namespace";
import { AccountService } from "../../shared/services/account.service";
import { AccountNamespace } from "../../shared/namespaces/account.namespace";
import { BehaviorSubject, filter, Subject, Subscription, takeUntil, } from "rxjs";
import { CryptoService } from "../../shared/services/crypto.service";
import { ToastrService } from "ngx-toastr";
import { ConversationNamespace } from "../../shared/namespaces/conversations.namespace";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
    providers: [DatePipe]
})
export class ChatRoomComponent {

    public messages: MessageNamespace.MessageInterface[] = [];
    public receivedMessage: string = '';
    public conversation: any;
    public user: BehaviorSubject<AccountNamespace.AccountInterface>;
    public sharedSecret: string = '';
    public receivedMessageSubscription: Subscription;
    private _destroyed$: Subject<void> = new Subject<void>();

    @ViewChild('chatContainer') private chatContainer: ElementRef;

    constructor(
        private _router: Router,
        private _websocketService: WebSocketService,
        private _accountService: AccountService,
        private _activatedRoute: ActivatedRoute,
        private _cryptoService: CryptoService,
        private _toastrService: ToastrService,
        private _datePipe: DatePipe
    ) { }

    async ngOnInit(): Promise<void> {
        this.connectToChatroom();

        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntil(this._destroyed$),
        ).subscribe(event => {
            const conversationId: ActivatedRouteSnapshot = this._activatedRoute.snapshot.params['conversationId'];

            if (conversationId !== this.conversation.id) {
                this._websocketService.disconnectFromChatroom();
                this.connectToChatroom();
            }
        });
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }

    ngOnDestroy(): void {
        if (this.receivedMessageSubscription) {
            this.receivedMessageSubscription.unsubscribe();
        }
        this._websocketService.disconnectFromChatroom();
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public async sendMessage(message: MessageNamespace.SendMessageInterface): Promise<void> {
        try {
            message.sender = this.user.value.user;
            message.conversation = this.conversation;
            await this._websocketService.sendMessage(
                message,
                this.sharedSecret,
            );
            this.scrollToBottom();
        } catch (error) {
            console.error('Failed to send message:', error);
            this._toastrService.error('Failed to send message');
        }
    }

    public async connectToChatroom(): Promise<void> {
        try {
            const conversationId: string = this._activatedRoute.snapshot.params['conversationId'];
            await this._initializeWebSocketConnection(conversationId);
            this.user = this._accountService.getAccount();

            this._activatedRoute.params.subscribe(params => {
                this._websocketService.getConversationById(params['conversationId'])
                    .subscribe((data: ConversationNamespace.ConversationInterface) => {
                        this._setChatRoomData(data);
                    });
            });
        } catch (error) {
            console.error('Failed to reconnect to chatroom:', error);
            this._toastrService.error('Failed to reconnect to chatroom');
        }
    }

    private async _setChatRoomData(data: any): Promise<void> {
        this.conversation = data;
        this.sharedSecret = this._setSharedSecret();
        this._loadMessages(data)
        this._subscribeToMessages();
    }

    private async _loadMessages(data: any): Promise<void> {
        try {
            this.messages = data.messages.map((message: MessageNamespace.MessageInterface) => {
                const decryptedMessage: {
                    message: string;
                } = this._cryptoService.decryptMessage(message.message, this.sharedSecret);
                message.message = decryptedMessage.message;
                message.createdAt = this._datePipe.transform(message.createdAt, 'yyyy-MM-dd  HH:mm') as string;
                return message;
            });
        } catch (error) {
            console.error('Failed to decrypt messages:', error);
            this._toastrService.error('Failed to decrypt messages');
        }
    }

    private async _initializeWebSocketConnection(conversationId: string): Promise<void> {
        try {
            await this._websocketService.connectToChatroom(conversationId);
        } catch (error) {
            this._toastrService.error('Failed to connect to chatroom');
        }
    }

    private async _subscribeToMessages(): Promise<void> {
        try {

            if (this.receivedMessageSubscription) {
                this.receivedMessageSubscription.unsubscribe();
            }

            this.receivedMessageSubscription =
                this._websocketService
                    .receiveMessages(this.sharedSecret)
                    .subscribe((message: MessageNamespace.MessageInterface) => {
                        this.messages.push(message);
                    });
        } catch (error) {
            console.error('Failed to subscribe to messages:', error);
            this._toastrService.error('Failed to subscribe to messages');
        }
    }

    private _setSharedSecret(): string {
        const [friend1, friend2] = this.conversation.friend;
        return friend1.name === this.user.value.user.username
            ? friend1.cryptoKey.sharedSecret
            : friend2.cryptoKey.sharedSecret;
    }
}