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


@NgModule({
  declarations: [LandingPageComponent, CategoryBudgetExpenseComponent],
  imports: [
    CommonModule,
    MatIconModule,
    IgxProgressBarModule,
    IgxAutocompleteModule,
    IgxDropDownModule,
    IgxInputGroupModule,
    FormsModule,
    CustomPipesModule,
    IgxPieChartCoreModule
  ],
  providers: [
    CalendarService
  ]
})
export class HomeModule {
}
