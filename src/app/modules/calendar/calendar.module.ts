import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarNewPageComponent} from './components/calendar-new-page/calendar-new-page.component';
import {AddExpenseComponent} from './components/calendar-new-page/add-expense/add-expense.component';
import {AddIncomeComponent} from './components/calendar-new-page/add-income/add-income.component';
import {CalendarPageComponent} from './components/calendar-page/calendar-page.component';
import {CalendarContainerComponent} from './components/calendar-page/calendar-container/calendar-container.component';
import {CalendarDayExpenseComponent} from './components/calendar-page/calendar-day-expense/calendar-day-expense.component';
import {CalendarNumberComponent} from './components/calendar-page/calendar-number/calendar-number.component';
import { CalendarLayoutComponent } from './components/calendar-layout/calendar-layout.component';
import {CalendarRoutingModule} from './calendar-routing.module';
import {CalendarComponentsModule} from './components/calendar-components.module';
import {SiteLayoutComponent} from '../../layout/site-layout/site-layout.component';
import {CalendarService} from './calendar.service';
import {CalendarResolver} from './calendar.resolver';



@NgModule({
  declarations: [
    CalendarLayoutComponent
  ],
  imports: [
    CalendarRoutingModule,
    CommonModule,
    CalendarComponentsModule
  ],
  providers: [
    CalendarResolver,
    CalendarService,
  ]
})
export class CalendarModule { }
