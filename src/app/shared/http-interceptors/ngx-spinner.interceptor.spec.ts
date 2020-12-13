import { TestBed } from '@angular/core/testing';

import { NgxSpinnerInterceptor } from './ngx-spinner.interceptor';

describe('NgxSpinnerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NgxSpinnerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NgxSpinnerInterceptor = TestBed.inject(NgxSpinnerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
