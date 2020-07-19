import {Injectable} from '@angular/core';
import {CalendarMonth} from './enums/calendar-month.enum';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BudgetDayModel} from './models/budget-day.model';
import {CalendarExpenseModel} from './models/calendar-expense.model';
import {CalendarIncomeModel} from './models/calendar-income.model';
import {Observable} from 'rxjs';
import {FacadeModel} from '../../shared/facade.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private getCalendarUrl = 'https://localhost:5001/api/v1/Budget/get';
  private addIncomeUrl = 'https://localhost:5001/api/v1/Income/create';
  private addExpenseUrl = 'https://localhost:5001/api/v1/Expenses/create';
  private genericIncomeUrl = 'https://localhost:5001/api/v1/Income/';
  private genericExpenseUrl = 'https://localhost:5001/api/v1/Expenses/';
  private genericCategoryUrl = 'https://localhost:5001/api/v1/Categories/';
  private genericAccountUrl = 'https://localhost:5001/api/v1/Account/';

  constructor(private readonly http: HttpClient) {

  }

  public getBudgetDays(month: CalendarMonth, year: number, userId: number): Observable<BudgetDayModel[]> {
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
    return this.http.get<CalendarIncomeModel>(this.genericExpenseUrl + id);
  }

  public updateExpense(expense: CalendarExpenseModel): Observable<any> {
    return this.http.patch(this.genericExpenseUrl + expense.id, expense);
  }

  public deleteExpense(id: string): Observable<any> {
    return this.http.delete(this.genericExpenseUrl + id);
  }

  public getCategories(userId: string): Observable<Array<FacadeModel>> {
    return this.http.get<Array<FacadeModel>>(this.genericCategoryUrl + userId);
  }

  public getAccounts(userId: string): Observable<Array<FacadeModel>> {
    return this.http.get<Array<FacadeModel>>(this.genericAccountUrl + userId);
  }

}
