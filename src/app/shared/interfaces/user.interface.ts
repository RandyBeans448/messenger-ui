import { FriendRequestNamespace } from "./friend-request.interface";

export namespace UserNamespace {

    // Interfaces for the FE
    export interface UserInterface {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        friendRequests: FriendRequestNamespace.FriendRequestInterface[];
        updatedAt: string;
        createdAt: string;
        deletedAt: string | null;
    }
}