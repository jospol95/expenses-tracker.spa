import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {noop, Observable} from 'rxjs';
import {AuthorizationService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private __authenticationService: AuthorizationService, private __router: Router) {

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.__authenticationService.isLoggedIn) {
      this.__router.navigate(['login']).then(r => noop());
      return false;
    } else {
      return true;
    }
  }
}

