import {Injectable} from '@angular/core';
import {FacadeModel} from '../models/facade.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AccountModel} from '../models/account.model';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private genericAccountUrl = 'https://localhost:5001/api/v1/Account/';
  private addAccountUrl = this.genericAccountUrl + 'create';

  constructor(private readonly http: HttpClient) {
  }

  public getAccounts(userId: string): Observable<Array<FacadeModel>> {
    return this.http.get<Array<FacadeModel>>(this.genericAccountUrl + userId);
  }


  public createAccount(account: AccountModel): Observable<number>{
    return this.http.post<number>(this.addAccountUrl, account);
  }

  public updateAccount(account: AccountModel): Observable<any>{
    return this.http.patch<boolean>(this.genericAccountUrl + account.id, account);
  }

  public deleteAccount(id: number): Observable<any>{
    return this.http.delete(this.addAccountUrl + id);
  }

}
