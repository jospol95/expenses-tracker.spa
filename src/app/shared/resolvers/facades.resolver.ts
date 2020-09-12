import {CalendarService} from '../../modules/calendar/calendar.service';
import {FacadesViewModel} from '../view-models/facades-view-model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of, zip} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FacadesResolver implements Resolve<FacadesViewModel> {
  public data: FacadesViewModel = new FacadesViewModel();
  public userId = '123';

  constructor(private readonly _service: CalendarService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never>{
    return zip(
      this._service.getCategories(this.userId),
      this._service.getAccounts(this.userId),
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
