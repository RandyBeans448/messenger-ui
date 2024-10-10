export namespace MessageNamespace {

    export interface MessageInterface {
        message: string;
        senderId: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface SendMessageInterface {
        message: string;
        senderId: string;
        conversation: any
        createdAt: string;
        updatedAt: string;
    }
}