import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {AuthorizationService} from '../../../shared/services/auth.service';
import {noop} from 'rxjs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor(private readonly _authService: AuthorizationService, private readonly _router: Router) {
  }

  ngOnInit(): void {
    if (this._authService.isLoggedIn) {
      this._router.navigate(['home']).then((r) => noop());
    }
  }

}
