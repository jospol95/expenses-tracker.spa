import {Injectable} from '@angular/core';
import {CalendarMonth} from './enums/calendar-month.enum';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BudgetDayModel} from './models/budget-day.model';
import {CalendarExpenseModel} from './models/calendar-expense.model';
import {CalendarIncomeModel} from './models/calendar-income.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private getCalendarUrl = 'https://localhost:5001/api/v1/Budget/get';
  private addIncomeUrl = 'https://localhost:5001/api/v1/Income/create';
  private addExpenseUrl = 'https://localhost:5001/api/v1/Expenses/create';

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

}
