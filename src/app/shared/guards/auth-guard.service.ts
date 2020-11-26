import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {noop, Observable} from 'rxjs';
import {AuthorizationService} from '../services/auth.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private _authenticationService: AuthorizationService, private _router: Router) {

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._authenticationService.isLoggedIn) {
      // this.__router.navigate(['login']).then(r => noop());
      window.location.href = environment.auth_spa_url + 'auth/login';
      return false;
    } else {
      return true;
    }
  }
}

