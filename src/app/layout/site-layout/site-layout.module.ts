import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiteLayoutComponent} from './site-layout.component';
import {TopNavbarComponent} from '../../shared/components/top-navbar/top-navbar.component';
import {CalendarPageComponent} from '../../modules/calendar/components/calendar-page/calendar-page.component';
import {SiteLayoutRoutingModule} from './site-layout.routing.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatSelectModule} from '@angular/material';
import {CalendarContainerComponent} from '../../modules/calendar/components/calendar-container/calendar-container.component';
import {CalendarDayExpenseComponent} from '../../modules/calendar/components/calendar-day-expense/calendar-day-expense.component';
import {CalendarNumberComponent} from '../../modules/calendar/components/calendar-number/calendar-number.component';


@NgModule({
  declarations: [
    SiteLayoutComponent,
    TopNavbarComponent,
    CalendarPageComponent,
    CalendarContainerComponent,
    CalendarDayExpenseComponent,
    CalendarNumberComponent,
  ],
  imports: [
    SiteLayoutRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
  ]
})
export class SiteLayoutModule { }
