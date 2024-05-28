import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { AppConfigService } from '../environments/services/config.service';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { HomeModule } from './home/home.module';
import { ShellComponent } from './core/shell/shell.component';
import { ToastrModule } from 'ngx-toastr';

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
    ShellComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    ChatRoomModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      tapToDismiss: true,
  }),
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
