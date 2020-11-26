import {Injectable, Injector} from '@angular/core';
import {CalendarService} from '../calendar.service';
import {resolve} from 'url';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of, zip} from 'rxjs';
import {CalendarPageViewModel} from '../view-models/calendar-page-view.model';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {CalendarMonth} from '../enums/calendar-month.enum';
import {BudgetDayModel} from '../models/budget-day.model';
import {ServiceInjector} from '../../../shared/services/service-injector.service';

//TODO remove from root
@Injectable({
  providedIn: 'root'
})

export class CalendarResolver extends ServiceInjector implements Resolve<BudgetDayModel[]> {
  public data: CalendarPageViewModel = new CalendarPageViewModel();
  public userId;

  constructor(private readonly injector: Injector, private readonly _service: CalendarService) {
    super(injector);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    const currentDate = new Date();
    const currentMonth: CalendarMonth = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();

    this.userId = this._authService.getUserId();

    return zip(
      this._service.getBudgetDays(currentMonth, currentYear, this.userId),
      this._categoriesService.getCategories(this.userId),
      this._accountsService.getAccounts(this.userId),
    ).pipe(
      catchError(() => {
        return EMPTY;
      }), tap((resultArray) => {
        this.data.budgetDays = resultArray[0];
        this.data.categories = resultArray[1];
        this.data.accounts = resultArray[2];

      }), switchMap(() => {
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
