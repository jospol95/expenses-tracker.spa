import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountModel} from '../models/account.model';
import {Observable} from 'rxjs';
import {CategoryModel} from '../models/category.model';
import {FacadeModel} from '../models/facade.model';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  private genericCategoryUrl = 'https://localhost:5001/api/v1/Categories/';

  private addCategoryUrl = this.genericCategoryUrl + 'create';

  constructor(private readonly http: HttpClient) {
  }

  public getCategories(userId: string): Observable<Array<FacadeModel>> {
    return this.http.get<Array<FacadeModel>>(this.genericCategoryUrl + userId);
  }


  public getAccounts(userId: string, mapToModel: boolean): Observable<Array<FacadeModel>> {
    return this.http.get<Array<FacadeModel>>(this.genericCategoryUrl + userId);
  }

  public createAccount(category: CategoryModel): Observable<number>{
    return this.http.post<number>(this.addCategoryUrl, category);
  }

  public updateAccount(category: CategoryModel): Observable<any>{
    return this.http.patch<boolean>(this.genericCategoryUrl + category.id, category);
  }

  public deleteAccount(id: number): Observable<any>{
    return this.http.delete(this.genericCategoryUrl + id);
  }
}
