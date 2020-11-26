import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarNewPageComponent} from './calendar-new-page/calendar-new-page.component';
import {AddExpenseComponent} from './calendar-new-page/add-expense/add-expense.component';
import {AddIncomeComponent} from './calendar-new-page/add-income/add-income.component';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';
import {CalendarContainerComponent} from './calendar-page/calendar-container/calendar-container.component';
import {CalendarDayExpenseComponent} from './calendar-page/calendar-day-expense/calendar-day-expense.component';
import {CalendarNumberComponent} from './calendar-page/calendar-number/calendar-number.component';
import {CalendarLayoutComponent} from './calendar-layout/calendar-layout.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedComponentsModule} from '../../../shared/components/shared-components.module';
import { CalendarEditEntryModalComponent } from './modals/calendar-edit-entry-modal/calendar-edit-entry-modal.component';
import { CalendarEditExpenseModalComponent } from './modals/calendar-edit-expense-modal/calendar-edit-expense-modal.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    CalendarNewPageComponent,
    AddExpenseComponent,
    AddIncomeComponent,
    CalendarPageComponent,
    CalendarContainerComponent,
    CalendarDayExpenseComponent,
    CalendarNumberComponent,
    CalendarEditEntryModalComponent,
    CalendarEditExpenseModalComponent,
  ],
  entryComponents: [
    CalendarEditEntryModalComponent,
    CalendarEditExpenseModalComponent
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        RouterModule,
        MatTabsModule,
        FormsModule,
        SharedComponentsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatIconModule,
        MatCheckboxModule,
    ]
})
export class CalendarComponentsModule {
}
