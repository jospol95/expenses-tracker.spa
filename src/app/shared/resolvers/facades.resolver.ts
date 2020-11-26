import {CalendarService} from '../../modules/calendar/calendar.service';
import {FacadesViewModel} from '../view-models/facades-view-model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of, zip} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {ServiceInjector} from '../services/service-injector.service';

@Injectable({
  providedIn: 'root'
})

export class FacadesResolver extends ServiceInjector implements Resolve<FacadesViewModel> {
  public data: FacadesViewModel = new FacadesViewModel();
  public userId = this._authService.getUserId();

  constructor(private readonly _injector: Injector) {
    super(_injector);
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never>{
    return zip(
      this._categoriesService.getCategories(this.userId),
      this._accountsService.getAccounts(this.userId),
    ).pipe(
      catchError(() => {
        return EMPTY;
      }), tap((resultArray) => {
        this.data.categories = resultArray[0];
        this.data.accounts = resultArray[1];

      }), switchMap(() => {
        return of(this.data);
      })
    );
  }
}
