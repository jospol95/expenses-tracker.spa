import {Injectable, Injector} from '@angular/core';
import {AuthorizationService} from './auth.service';
import {CategoriesService} from './categories.service';
import {AccountService} from './accounts.service';

@Injectable({
  providedIn: 'root'
})


export class ServiceInjector {
  protected _authService: AuthorizationService;
  protected _accountsService: AccountService;
  protected _categoriesService: CategoriesService;

  constructor(private readonly injectorB: Injector) {
    this._authService = injectorB.get(AuthorizationService);
    this._accountsService = injectorB.get(AccountService);
    this._categoriesService = injectorB.get(CategoriesService);
  }
}
