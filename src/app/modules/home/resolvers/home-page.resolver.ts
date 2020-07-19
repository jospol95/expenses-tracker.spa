import {Injectable} from '@angular/core';
import {BudgetDayModel} from '../../calendar/models/budget-day.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HomePageViewModel} from '../view-models/home-page-view.model';
import {CalendarService} from '../../calendar/calendar.service';
import {EMPTY, Observable, of, zip} from 'rxjs';
import {CalendarMonth} from '../../calendar/enums/calendar-month.enum';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HomePageResolver implements Resolve<HomePageViewModel> {

  constructor(private readonly _calendarService: CalendarService){

  }
  public userId = '123';
  public data: HomePageViewModel = new HomePageViewModel();

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomePageViewModel> | Promise<HomePageViewModel> | HomePageViewModel {
    const currentDate = new Date();
    const currentMonth: CalendarMonth = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();

    return zip(
      this._calendarService.getBudgetDays(currentMonth, currentYear, 123),
      this._calendarService.getCategories(this.userId),
      this._calendarService.getAccounts(this.userId),
    ).pipe(
      catchError(() => {
        return EMPTY;
      }),
      tap((result) => {
        this.data.budgetDays = result[0];
        this.data.categories = result[1];
        this.data.accounts = result[2];
      }),
      switchMap(() => {
        return of(this.data);
      })
    );
    //
    // return this._calendarService.getBudgetDays(currentMonth, currentYear, 123).pipe(
    //   catchError(() => {
    //     return EMPTY;
    //   }),
    //   tap((result) => {
    //     this.data.budgetDays = result;
    //   }),
    //   switchMap(() => {
    //     return of(this.data);
    //   })
    // );
  }

}
