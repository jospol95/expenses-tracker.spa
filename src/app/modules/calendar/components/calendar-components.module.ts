import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarNewPageComponent} from './calendar-new-page/calendar-new-page.component';
import {AddExpenseComponent} from './calendar-new-page/add-expense/add-expense.component';
import {AddIncomeComponent} from './calendar-new-page/add-income/add-income.component';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';
import {CalendarContainerComponent} from './calendar-page/calendar-container/calendar-container.component';
import {CalendarDayExpenseComponent} from './calendar-page/calendar-day-expense/calendar-day-expense.component';
import {CalendarNumberComponent} from './calendar-page/calendar-number/calendar-number.component';
import {CalendarLayoutComponent} from './calendar-layout/calendar-layout.component';
import {MatFormFieldModule, MatIconModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    CalendarNewPageComponent,
    AddExpenseComponent,
    AddIncomeComponent,
    CalendarPageComponent,
    CalendarContainerComponent,
    CalendarDayExpenseComponent,
    CalendarNumberComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    MatTabsModule
  ]
})
export class CalendarComponentsModule { }
