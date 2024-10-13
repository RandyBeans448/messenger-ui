import { ConversationNamespace } from "./conversations.namespace";
import { UserNamespace } from "./user.interface";

export namespace MessageNamespace {

    export interface MessageInterface {
        message: string;
        sender: UserNamespace.UserInterface;
        createdAt: string;
        updatedAt: string;
    }

    export interface SendMessageInterface {
        message: string;
        sender: UserNamespace.UserInterface | null;
        conversation: ConversationNamespace.ConversationInterface | null;
        createdAt: string;
        updatedAt: string;
    }
}