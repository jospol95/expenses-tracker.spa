import {Injectable} from '@angular/core';
import {AuthLoginModel} from '../models/auth-login.model';
import {AuthorizedUserModel} from '../models/auth-user-model';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {
  // tslint:disable-next-line:variable-name
  private _isLoggedIn = false;
  private tokenKey = 'login_token';

  public get isLoggedIn(): boolean {
    return this._isLoggedIn || this.getToken() != null;
  }

  public set isLoggedIn(value) {
    this._isLoggedIn = value;
  }

  public tryLogin(loginModel: AuthLoginModel) {
    const username = 'lanjos26';
    const password = '2625';

    if (loginModel.username === username && loginModel.password === password) {
      const authorizedUserModel: AuthorizedUserModel = {
        userId: '123',
        username: loginModel.username,
        firstName: 'Jose',
        lastName: 'Polanco'
      };
      this.saveToken(authorizedUserModel);
      this.isLoggedIn = true;
    }
  }

  public getLoggedUserModel(): AuthorizedUserModel {
    return JSON.parse(this.getToken());
  }

  private saveToken(authorizedUserModel: AuthorizedUserModel) {
    localStorage.setItem(this.tokenKey, JSON.stringify(authorizedUserModel));
  }

  private getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
