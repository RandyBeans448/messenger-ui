import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'messenger-ui';

  constructor(
    private route: ActivatedRoute,
    private _accountService: AccountService,
  ) { }
}
