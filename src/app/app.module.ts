import { BrowserModule } from '@angular/platform-browser';
import {DEFAULT_CURRENCY_CODE, Injector, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { SiteLayoutModule } from './layout/site-layout/site-layout.module';
import { CalendarContainerComponent } from './modules/calendar/components/calendar-page/calendar-container/calendar-container.component';
import { CalendarDayExpenseComponent } from './modules/calendar/components/calendar-page/calendar-day-expense/calendar-day-expense.component';
import { CalendarNumberComponent } from './modules/calendar/components/calendar-page/calendar-number/calendar-number.component';
import { CalendarNewPageComponent } from './modules/calendar/components/calendar-new-page/calendar-new-page.component';
import { AddExpenseComponent } from './modules/calendar/components/calendar-new-page/add-expense/add-expense.component';
import { AddIncomeComponent } from './modules/calendar/components/calendar-new-page/add-income/add-income.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import {AutocompletePipeStartsWith} from './shared/pipes/auto-complete-pipe';
import {CustomPipesModule} from './shared/pipes/custom-pipes.module';
import { AuthPageComponent } from './modules/auth/auth-page/auth-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {SharedComponentsModule} from './shared/components/shared-components.module';

import {FormsModule} from '@angular/forms';
import {AuthGuardService} from './shared/guards/auth-guard.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgxSpinnerInterceptor} from './shared/http-interceptors/ngx-spinner.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SiteLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomPipesModule,
    MatTabsModule,
    SharedComponentsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
  ],
  exports: [
    // SweetAlert2Module
  ],
  providers: [
    HttpClient,
    CurrencyPipe,
    DecimalPipe,
    AuthGuardService,
    NgxSpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgxSpinnerInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
