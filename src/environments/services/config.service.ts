import { HttpBackend, HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AuthClientConfig } from "@auth0/auth0-angular";
import { EnvironmentNamespace } from "../interfaces/environment.namespace";
import { APP_CONFIG } from "../../injectors";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AppConfigService {
    static env: EnvironmentNamespace.MainConfig;
    httpClient: HttpClient;
    handler: HttpBackend;
    authClientConfig: AuthClientConfig;

    constructor(
        @Inject(APP_CONFIG) private readonly appConfig: EnvironmentNamespace.BaseConfig,
        private _authClientConfig: AuthClientConfig,
        private _http: HttpClient,
        private _handler: HttpBackend,
    ) {
        this.httpClient = _http;
        this.handler = _handler;
        this.authClientConfig = _authClientConfig;
    }

    public async loadConfig() {
        console.log('yolo')
        const baseUrl = this.appConfig.baseUrl;
        const thing = await lastValueFrom(this.httpClient.get(`${baseUrl}/ui-env/main_ui`));
        console.log(thing)

        return thing;

        // return new Promise<void>((resolve, reject) => {
        //     /**
        //      * We need to create a new HttpClient so the HTTP_INTERCEPTOR 
        //      * doesn't get fired as it would initialize the AuthService
        //      * which hasn't been set yet as we are waiting for the config to be returned first
        //      */
        //     this.httpClient = new HttpClient(this.handler);
        //     this.httpClient.get(`${baseUrl}/ui-env/main_ui`)
        //         .toPromise()
        //         .then((response: Object | undefined) => {
        //             AppConfigService.env = {
        //                 ...<EnvironmentNamespace.MainConfig>response,
        //                 version: this.appConfig.version,
        //             };

        //             this.authClientConfig.set({
        //                 clientId: AppConfigService.env.auth0.clientId,
        //                 domain: AppConfigService.env.auth0.domain,
        //                 authorizationParams: {
        //                     audience: '/core/api',
        //                     redirect_uri: `${window.location.origin}`,
        //                 },
        //                 httpInterceptor: {
        //                     allowedList: [
        //                         {
        //                             uri: `${baseUrl}/*`,
        //                             tokenOptions: {
        //                                 authorizationParams: {
        //                                     audience: '/core/api',
        //                                 },
        //                             },
        //                         },
        //                     ],
        //                 },
        //             });
        //             resolve();
        //         })
        //         .catch((response: any) => {
        //             window.location.href = '/error.html';
        //             reject(`Could not load the config file`);
        //         });
        // });
    }
}