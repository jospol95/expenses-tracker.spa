import {Injectable} from '@angular/core';
import {CalendarService} from './calendar.service';
import {resolve} from 'url';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of, zip} from 'rxjs';
import {CalendarPageViewModel} from './view-models/calendar-page-view.model';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {CalendarMonth} from './enums/calendar-month.enum';
import {BudgetDayModel} from './models/budget-day.model';

@Injectable({
  providedIn: 'root'
})

export class CalendarResolver implements Resolve<BudgetDayModel[]> {
  public data: CalendarPageViewModel = new CalendarPageViewModel();
  public userId = '123';

  constructor(private readonly _service: CalendarService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    const currentDate = new Date();
    const currentMonth: CalendarMonth = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();

    return zip(
      this._service.getBudgetDays(currentMonth, currentYear, 123),
      this._service.getCategories(this.userId)
    ).pipe(
      catchError(() => {
        return EMPTY;
      }), tap((resultArray) => {
        this.data.budgetDays = resultArray[0];
        this.data.categories = resultArray[1];
      }), map(() => {
        return of(this.data);
      })
    );

    // return this._service.getBudgetDays(currentMonth, currentYear, 123)
    //   .pipe(
    //     catchError((err) => {
    //       return EMPTY;
    //     }),
    //     mergeMap((response) => {
    //       return of(response);
    //     })
    //   );
  }

}
