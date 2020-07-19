import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {CalendarNewPageViewModel} from '../view-models/calendar-new-page-view.model';
import {CalendarService} from '../calendar.service';
import {EMPTY, Observable, of, zip} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CalendarNewPageResolver implements Resolve<CalendarNewPageViewModel> {
  public data: CalendarNewPageViewModel = new CalendarNewPageViewModel();
  public userId = '123';

  constructor(private readonly _service: CalendarService) {
    // authService_getUserid;
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    return zip(
      this._service.getCategories(this.userId),
      this._service.getAccounts(this.userId),
    ).pipe(
      catchError((err) => {
        return EMPTY;
      }),
      tap((arrayResult) => {
        this.data.categories = arrayResult[0];
        this.data.accounts = arrayResult[1];
      }),
      switchMap(() => {
        return of(this.data);
      })
    );
  }

}
