import {Injectable} from '@angular/core';
import {FacadeModel} from '../models/facade.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AccountModel} from '../models/account.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private genericAccountUrl = environment.BUDGET_API + '/v1/Account/';
  private addAccountUrl = this.genericAccountUrl + 'create';

  constructor(private readonly http: HttpClient) {
  }

  public getAccounts(userId: string): Observable<Array<AccountModel>> {
    return this.http.get<Array<AccountModel>>(this.genericAccountUrl + userId);
  }

  public createAccount(account: AccountModel): Observable<number>{
    return this.http.post<number>(this.addAccountUrl, account);
  }

  public updateAccount(account: AccountModel): Observable<any>{
    return this.http.patch<boolean>(this.genericAccountUrl + account.id, account);
  }

  public deleteAccount(id: number): Observable<any>{
    return this.http.delete(this.genericAccountUrl + id);
  }

}
