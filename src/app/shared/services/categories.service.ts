import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountModel} from '../models/account.model';
import {Observable} from 'rxjs';
import {CategoryModel} from '../models/category.model';
import {FacadeModel} from '../models/facade.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  private genericCategoryUrl = environment.BUDGET_API + '/v1/Categories/';

  private addCategoryUrl = this.genericCategoryUrl + 'create';

  constructor(private readonly http: HttpClient) {
  }

  public getCategories(userId: string): Observable<Array<CategoryModel>> {
    return this.http.get<Array<CategoryModel>>(this.genericCategoryUrl + userId);
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
