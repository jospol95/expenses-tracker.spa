import { BrowserModule } from '@angular/platform-browser';
import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {SiteLayoutComponent} from './layout/site-layout/site-layout.component';
import {SiteLayoutModule} from './layout/site-layout/site-layout.module';
import { CalendarContainerComponent } from './modules/calendar/components/calendar-page/calendar-container/calendar-container.component';
import { CalendarDayExpenseComponent } from './modules/calendar/components/calendar-page/calendar-day-expense/calendar-day-expense.component';
import { CalendarNumberComponent } from './modules/calendar/components/calendar-page/calendar-number/calendar-number.component';
import { CalendarNewPageComponent } from './modules/calendar/components/calendar-new-page/calendar-new-page.component';
import { AddExpenseComponent } from './modules/calendar/components/calendar-new-page/add-expense/add-expense.component';
import { AddIncomeComponent } from './modules/calendar/components/calendar-new-page/add-income/add-income.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CurrencyPipe, DecimalPipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SiteLayoutModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [
    HttpClient,
    CurrencyPipe,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
