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
        const loginToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bXlAZXhhbXBsZS5jb20iLCJnaXZlbl9uYW1lIjoiZHVtbXkiLCJmYW1pbHlfbmFtZSI6InVzZXIiLCJzaWQiOiI1NzNjNDQ2NC01ODM0LTRhMWItYmRhOS00M2I5MTAxYTVhNWIiLCJuYmYiOjE2MDc2NjMzMTQsImV4cCI6MTYwODI2ODExNCwiaWF0IjoxNjA3NjYzMzE0LCJpc3MiOiJodHRwOi8vd3d3dy5sb2NhbGhvc3Q6NjAwMS8ifQ.FDYpOfL4Y1hQbnQE5uMdryK3QxxwDhYXRrYTti5Cu_K4Io9FprrQJwdunw8nhvWCZOiWjlltQ3EsN_IUh_g0cQ';
        this._router.navigate(['/auth'], {queryParams: {'auth-token': loginToken}}).then();
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

