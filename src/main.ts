import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { EnvironmentNamespace } from './environments/interfaces/environment.namespace';
import { APP_CONFIG } from './injectors';

fetch('/assets/config.json')
    .then(response => response.json())
    .then((config: EnvironmentNamespace.BaseConfig) => {
        if (config.production) {
            enableProdMode();
        }

        platformBrowserDynamic([
            { provide: APP_CONFIG, useValue: config },
        ])
            .bootstrapModule(AppModule)
            .then(() => {
                // Display current version
                console.log(`Current version: ${config.version}`)
            })
            .catch(err => console.error(err));
    });