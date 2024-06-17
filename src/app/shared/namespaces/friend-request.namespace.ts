import { UserNamespace } from "./user.interface";

export namespace FriendRequestNamespace {

    export interface FriendRequestInterface {
        id: string,
        createdAt: string,
        updatedAt: string,
        deletedAt: string | null,
        receiver: UserNamespace.UserInterface
    }

    export interface FriendRequestResponseInterface {
        friendRequestId: string,
        response: boolean
    }

}
