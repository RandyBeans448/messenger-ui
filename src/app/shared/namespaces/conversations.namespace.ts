import { FriendNamespace } from "./friend.namespace";
import { MessageNamespace } from "./messages.namespace";

export namespace ConversationNamespace {
    
    export interface ConversationInterface {
        id: string;
        friend: FriendNamespace.FriendInterface[];
        messages: MessageNamespace.MessageInterface[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | null;
    }
}