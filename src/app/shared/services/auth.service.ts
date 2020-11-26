import {Injectable} from '@angular/core';
import {AuthLoginModel} from '../models/auth-login.model';
import {AuthorizedUserModel} from '../models/auth-user-model';
import {LocalStorageService} from './local-storage.service';
import {GlobalConstants} from '../components/global-constants';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Environment} from 'igniteui-angular-core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {
  // tslint:disable-next-line:variable-name
  private tokenKey = 'login_token';

  constructor(private readonly _localStorage: LocalStorageService) {

  }

  public get isLoggedIn(): boolean {
    // TODO check exp date, if expired, logout
    return this.tokenExists();
  }

  public tokenExists(){
    const token = this._localStorage.getKey(GlobalConstants.AUTH_TOKEN_NAME);
    return token != null;
  }

  public getUserId() {
    const decodedToken = this.getTokenDetails();
    return decodedToken.sid;
  }

  public saveAuthToken(authToken: string) {
    this._localStorage.saveValueWithKey(authToken, GlobalConstants.AUTH_TOKEN_NAME);
  }

  public killSession(){
    this._localStorage.removeItem(GlobalConstants.AUTH_TOKEN_NAME);
    window.location.href = environment.auth_spa_url + 'logout';
  }

  private getTokenDetails() {
    const helper = new JwtHelperService();
    const token = this._localStorage.getKey(GlobalConstants.AUTH_TOKEN_NAME);
    return helper.decodeToken(token);
  }



}
