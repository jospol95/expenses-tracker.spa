import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AuthorizationService} from '../../../shared/services/auth.service';
import {noop} from 'rxjs';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor(private readonly _authService: AuthorizationService,
              private readonly _localStorageService: LocalStorageService,
              private readonly _router: Router, private readonly _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      this.saveToken(params['auth-token']);
      this._router.navigate(['home']).then((r) => noop());
    });
  }

  private saveToken(token: string) {
    // TODO: Call API to verify authenticity of the token before saving it
    this._authService.saveAuthToken(token);
  }



}
