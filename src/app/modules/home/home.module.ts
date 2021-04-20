import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {CalendarService} from '../calendar/calendar.service';
import {HomePageResolver} from './resolvers/home-page.resolver';
import {MatIconModule} from '@angular/material/icon';
import {IgxAutocompleteModule, IgxDropDownModule, IgxInputGroupModule, IgxProgressBarModule} from 'igniteui-angular';
import {FormsModule} from '@angular/forms';
import {AppModule} from '../../app.module';
import {CustomPipesModule} from '../../shared/pipes/custom-pipes.module';
import {IgxPieChartCoreModule} from 'igniteui-angular-charts';
import { CategoryBudgetExpenseComponent } from './components/category-budget-expense/category-budget-expense.component';
import {RouterModule} from '@angular/router';
import { IncomeHomeComponent } from './components/landing-page/income-home/income-home.component';
import { ExpensesHomeComponent } from './components/landing-page/expenses-home/expenses-home.component';
import { BudgetHomeComponent } from './components/landing-page/budget-home/budget-home.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [LandingPageComponent, CategoryBudgetExpenseComponent, IncomeHomeComponent, ExpensesHomeComponent, BudgetHomeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    IgxProgressBarModule,
    IgxAutocompleteModule,
    IgxDropDownModule,
    IgxInputGroupModule,
    FormsModule,
    CustomPipesModule,
    RouterModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    CalendarService
  ]
})
export class HomeModule {
}
