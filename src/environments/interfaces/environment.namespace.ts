export namespace EnvironmentNamespace {

    export interface BaseConfig {
        baseUrl: string;
        production: boolean;
        version: string;
    }

    export interface MainConfig {
        production: boolean;
        name: string;
        baseApi: string;
        posthog: {
            key: string;
        };
        auth0: {
            clientId: string;
            domain: string;
        };
        version: string;
    }
}