export namespace UserNamespace {

    // Interfaces for the FE
    export interface UserInterface {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        friends: any[];
        updatedAt: string;
        createdAt: string;
        deletedAt: string | null;
    }
}