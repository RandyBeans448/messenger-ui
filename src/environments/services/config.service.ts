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

    loadConfig() {
        const baseUrl: string = this.appConfig.baseUrl;
        console.log(baseUrl);
        return new Promise<void>((resolve, reject) => {
            this.httpClient = new HttpClient(this.handler);

            return lastValueFrom(this.httpClient.get(`${baseUrl}/ui-env/main_ui`))
                .then((response: Object | undefined) => {
                    console.log(response);
                    AppConfigService.env = {
                        ...<EnvironmentNamespace.MainConfig>response,
                        version: this.appConfig.version,
                    };

                    this.authClientConfig.set({
                        clientId: AppConfigService.env.auth0.clientId,
                        domain: AppConfigService.env.auth0.domain,
                        authorizationParams: {
                            audience: 'messenger-two',
                            redirect_uri: `${window.location.origin}`,
                        },
                        httpInterceptor: {
                            allowedList: [
                                {
                                    uri: `${baseUrl}/*`,
                                    tokenOptions: {
                                        authorizationParams: {
                                            audience: 'messenger-two',
                                        },
                                    },
                                },
                            ],
                        },
                    });

                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    // window.location.href = '/error.html';
                    // reject(`Could not load the config file: ${error}`);
                });
        });
    }

}