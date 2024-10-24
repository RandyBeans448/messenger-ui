import { IconType } from "../../icon/icon.component";

export namespace SidebarNamespace {

    export interface ItemInterface {
        icon: IconType;
        label: string;
        dataTestId?: string;
        subtext?: string;
        link?: string;
        mobile?: boolean;
        function?: Function;
        disabled?: boolean;
        badge?: {
            value: string;
            dataTestId?: string;
        };
        key?: string; // For function template side items that navigate without a router link and still need css highlighting
        numberOfSavedDesigns?: number;
        action?: {
            icon: IconType;
            callback: Function;
            dataTestId?: string;
        };
    }
}