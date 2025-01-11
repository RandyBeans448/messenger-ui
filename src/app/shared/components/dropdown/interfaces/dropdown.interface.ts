export namespace DropdownNamespace {

    export interface OptionInterface<T = any> {
        value: T;
        label: string;
        dataTestId?: string;
        isDisabled?: boolean;
        options?: any
    }

    export interface OutputInterface<T = OptionInterface> {
        data: T;
        event: MouseEvent | PointerEvent;
    }
}