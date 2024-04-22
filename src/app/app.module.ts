import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { AppConfigService } from '../environments/services/config.service';

export function initializeApp(appConfigService: AppConfigService) {
  return (): Promise<any> => {
      return appConfigService.loadConfig();
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(),
  ],
  providers: [
    AppConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [AppConfigService],
        multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
