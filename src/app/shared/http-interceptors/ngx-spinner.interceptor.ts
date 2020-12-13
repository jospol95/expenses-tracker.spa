import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize, tap} from 'rxjs/operators';

@Injectable()
export class NgxSpinnerInterceptor implements HttpInterceptor {

  public count = 0;

  constructor(private ngxSpinner: NgxSpinnerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.ngxSpinner.show();
    this.count++;

    return next.handle(request).pipe(tap(
      event => console.log(event),
      error => console.log(error)
      ), finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.ngxSpinner.hide();
        }
      })
    );
  }
}
