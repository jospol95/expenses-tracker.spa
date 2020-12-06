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
      if (environment.production === false) {
        const loginToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiZHVtbXkiLCJmYW1pbHlfbmFtZSI6InVzZXIiLCJzaWQiOiI3NTJhMzJkYS1iZGE3LTQyZDMtYTA3NC0xMGE1NDUzZWIzM2MiLCJuYmYiOjE2MDcyOTU5NTgsImV4cCI6MTYwNzkwMDc1OCwiaWF0IjoxNjA3Mjk1OTU4LCJpc3MiOiJodHRwOi8vd3d3dy5sb2NhbGhvc3Q6NjAwMS8ifQ.nfhMEJaThw0NcFKscjwHAdTNvtPovo_1oHkXLk_rpxPlwoyxCfcZRY4R_LB-E5qoUCbd04e-VBrfIvc1lyuchw';
        this._router.navigate(['/auth'], { queryParams: { 'auth-token': loginToken} }).then();
        return true;
      }
      // this.__router.navigate(['login']).then(r => noop());
      window.location.href = environment.auth_spa_url + 'auth/login';
      return false;
    } else {
      return true;
    }
  }
}

