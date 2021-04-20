import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AuthorizationService} from '../../../shared/services/auth.service';
import {BudgetDayModel} from '../../calendar/models/budget-day.model';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private apiUrl = environment.BUDGET_API + '/v1/Home/';
  private userId: string;

  constructor(private readonly http: HttpClient, private readonly _authService: AuthorizationService) {
    this.userId = _authService.getUserId();
  }

  public getBudgetSummary(month: number, year: number, userId?: string) {
    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString())
      .set('userId', userId ? userId : this.userId.toString());

    return this.http.get<BudgetDayModel[]>(this.apiUrl + 'getBudgetSummary', {params});
  }

}
