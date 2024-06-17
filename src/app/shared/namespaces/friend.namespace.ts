export namespace FriendNamespace {

    export interface FriendArrayItemInterface {
        conversations: any,
        createdAt: string,
        deletedAt: null | string,
        friend: FriendInterface,
        id: string,
        updatedAt: string
    }

    export interface FriendInterface {
        auth0Id: string
        createdAt: string
        deletedAt: null
        email: string
        firstName: string
        id: string
        lastName: string
        updatedAt: string
    }
}