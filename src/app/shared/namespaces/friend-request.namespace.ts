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
        friendRequest_createdAt: string;
        friendRequest_deletedAt: null;
        friendRequest_id: string;
        friendRequest_receiverId: string;
        friendRequest_requestSentById: string;
        friendRequest_updatedAt: string;
        requestSentBy_auth0Id: string;
        requestSentBy_createdAt: string;
        requestSentBy_deletedAt: null;
        requestSentBy_email: string;
        requestSentBy_id: string;
        requestSentBy_updatedAt: string;
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
