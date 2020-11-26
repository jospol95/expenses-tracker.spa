import {Injectable} from '@angular/core';
import {CalendarMonth} from './enums/calendar-month.enum';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BudgetDayModel} from './models/budget-day.model';
import {CalendarExpenseModel} from './models/calendar-expense.model';
import {CalendarIncomeModel} from './models/calendar-income.model';
import {Observable} from 'rxjs';
import {FacadeModel} from '../../shared/models/facade.model';
import {CategoryModel} from '../../shared/models/category.model';
import {environment} from '../../../environments/environment';
import {AccountService} from '../../shared/services/accounts.service';
import {CategoriesService} from '../../shared/services/categories.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private getCalendarUrl = environment.BUDGET_API + '/v1/Budget/get';
  private addIncomeUrl = environment.BUDGET_API + '/v1/Income/create';
  private addExpenseUrl =  environment.BUDGET_API + '/v1/Expenses/create';
  private genericIncomeUrl = environment.BUDGET_API + '/v1/Income/';
  private genericExpenseUrl = environment.BUDGET_API + '/v1/Expenses/';

  constructor(private readonly http: HttpClient,
              private readonly _categoriesService: CategoriesService,
              private readonly _accountService: AccountService) {

  }

  public getBudgetDays(month: CalendarMonth, year: number, userId: string): Observable<BudgetDayModel[]> {
    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString())
      .set('userId', userId.toString());

    return this.http.get<BudgetDayModel[]>(this.getCalendarUrl, {params });
  }

  public addExpense(expense: CalendarExpenseModel): Observable<string> {
    return this.http.post<string>(this.addExpenseUrl, expense);
  }

  public addIncome(income: CalendarIncomeModel): Observable<string> {
    return this.http.post<string>(this.addIncomeUrl, income);
  }

  public getIncome(id: string): Observable<CalendarIncomeModel> {
    return this.http.get<CalendarIncomeModel>(this.genericIncomeUrl + id);
  }

  public updateIncome(income: CalendarIncomeModel): Observable<any> {
    return this.http.patch(this.genericIncomeUrl + income.id, income);
  }

  public deleteIncome(id: string): Observable<any> {
    return this.http.delete(this.genericIncomeUrl + id);
  }

  public getExpense(id: string): Observable<CalendarExpenseModel> {
    return this.http.get<CalendarExpenseModel>(this.genericExpenseUrl + id);
  }

  public updateExpense(expense: CalendarExpenseModel): Observable<any> {
    return this.http.patch(this.genericExpenseUrl + expense.id, expense);
  }

  public deleteExpense(id: string): Observable<any> {
    return this.http.delete(this.genericExpenseUrl + id);
  }

  public getCategories(userId: string): Observable<Array<CategoryModel>> {
    return this._categoriesService.getCategories(userId);
  }

  public getAccounts(userId: string): Observable<Array<FacadeModel>> {
    return this._accountService.getAccounts(userId);
  }

}
