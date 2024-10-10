import { FriendRequestNamespace } from "./friend-request.namespace";
import { FriendNamespace } from "./friend.namespace";

export namespace UserNamespace {

    // Interfaces for the FE
    export interface UserInterface {
        id: string;
        email: string;
        username: string;
        friend: FriendNamespace.FriendArrayItemInterface[];
        friendRequests: FriendRequestNamespace.FriendRequestInterface[];
        updatedAt: string;
        createdAt: string;
        deletedAt: string | null;
    }
}