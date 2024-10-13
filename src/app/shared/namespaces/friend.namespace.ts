import { ConversationNamespace } from "./conversations.namespace";
import { CryptoKeyNamespace } from "./crypto-key.namespace";

export namespace FriendNamespace {

    export interface FriendArrayItemInterface {
        conversations: any;
        createdAt: string;
        deletedAt: null | string;
        friend: FriendInterface;
        id: string;
        updatedAt: string;
    }

    export interface FriendInterface {
        id: string;
        username: string;
        email: string;
        updatedAt: string;
        createdAt: string;
        deletedAt: null;
        auth0Id?: string;
        conversations?: ConversationNamespace.ConversationInterface;
        cryptoKey?: CryptoKeyNamespace.CryptoKeyInterface;
    }
}