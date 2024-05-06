import { UserNamespace } from "./user.interface";

export namespace AccountNamespace {
    
    export interface AccountInterface {
        user: UserNamespace.UserInterface;
    }
}