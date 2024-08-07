import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AccountResolver } from './shared/resolvers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'home',
  },
  {
    path: 'home',
    resolve: [AccountResolver],
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'chat-room/:conversationId',
    resolve: [AccountResolver],
    canActivate: [AuthGuard],
    loadChildren: () => import('./chat-room/chat-room.module').then(m => m.ChatRoomModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
