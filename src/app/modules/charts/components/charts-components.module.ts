import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsPageComponent} from './charts-page/charts-page.component';
import {MontlyReportComponent} from './montly-report/montly-report.component';

import {BudgetChartService} from '../services/budget-chart.service';
import { AccountChartComponent } from './account-chart/account-chart.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  declarations: [ChartsPageComponent, MontlyReportComponent, AccountChartComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    NgxChartsModule,
  ],
  providers: [
    BudgetChartService
  ]
})
export class ChartsComponentsModule {
}
