import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsPageComponent} from './reports-page/reports-page.component';
import {MontlyReportComponent} from './montly-report/montly-report.component';
import {IgxDoughnutChartModule, IgxItemLegendModule, IgxLegendModule, IgxRingSeriesModule} from 'igniteui-angular-charts';
import {ReportsService} from '../services/reports.service';
import { AccountReportComponent } from './account-report/account-report.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [ReportsPageComponent, MontlyReportComponent, AccountReportComponent],
  imports: [
    CommonModule,
    IgxDoughnutChartModule,
    IgxRingSeriesModule,
    IgxItemLegendModule,
    IgxLegendModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
  ],
  providers: [
    ReportsService
  ]
})
export class ReportsComponentsModule {
}
