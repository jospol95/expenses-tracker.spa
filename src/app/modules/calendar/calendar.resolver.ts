import {Injectable} from '@angular/core';
import {CalendarService} from './calendar.service';
import {resolve} from 'url';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {CalendarPageViewModel} from './view-models/calendar-page-view.model';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {CalendarMonth} from './enums/calendar-month.enum';
import {BudgetDayModel} from './models/budget-day.model';

@Injectable({
  providedIn: 'root'
})

export class CalendarResolver implements Resolve<BudgetDayModel[]> {
  public data: CalendarPageViewModel;
  constructor(private readonly _service: CalendarService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    const currentDate = new Date();
    const currentMonth: CalendarMonth = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();
    return this._service.getBudgetDays(currentMonth, currentYear, 123)
      .pipe(
        catchError((err) => {
          return EMPTY;
        }),
        mergeMap((response) => {
         return of(response);
        })
      );
  }

}
