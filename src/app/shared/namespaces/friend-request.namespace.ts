import { UserNamespace } from "./user.interface";

export namespace FriendRequestNamespace {

    export interface FriendRequestInterface {
        id: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        receiver: UserNamespace.UserInterface
    }

    export interface FriendRequestResponseInterface {
        friendRequestId: string;
        response: boolean
    }

    export interface FriendRequestDTOInterface {
        friendRequest_id: string;
        friendRequest_receiverId: string;
        friendRequest_requestSentById: string;
        
        receiver_id: string,
        receiver_email: string,
        receiver_username: string,

        requestSentBy_id: string;
        requestSentBy_email: string;
        requestSentBy_username: string;
    }

    export interface TransformedFriendRequestDTOInterface {
        id: string;
        username: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
    }

    export interface FriendRequestCardInputInterface {
        
    }
}
