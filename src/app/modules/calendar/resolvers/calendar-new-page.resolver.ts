import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {CalendarNewPageViewModel} from '../view-models/calendar-new-page-view.model';
import {CalendarService} from '../calendar.service';
import {EMPTY, Observable, of, zip} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {ServiceInjector} from '../../../shared/services/service-injector.service';

@Injectable({
  providedIn: 'root'
})

export class CalendarNewPageResolver extends ServiceInjector implements Resolve<CalendarNewPageViewModel> {
  public data: CalendarNewPageViewModel = new CalendarNewPageViewModel();
  public userId = this._authService.getUserId();

  constructor(private readonly injector: Injector) {
    super(injector);
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    return zip(
      this._categoriesService.getCategories(this.userId),
      this._accountsService.getAccounts(this.userId),
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
