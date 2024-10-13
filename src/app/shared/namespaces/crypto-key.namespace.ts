import { FriendNamespace } from "./friend.namespace";

export namespace CryptoKeyNamespace {
    
    export interface CryptoKeyInterface {
        id: number;
        sharedSecret: string;
        friend: FriendNamespace.FriendInterface;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }
}