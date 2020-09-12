import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsPageComponent} from './charts-page/charts-page.component';
import {MontlyReportComponent} from './montly-report/montly-report.component';
import {
    IgxDoughnutChartModule,
    IgxItemLegendModule,
    IgxLegendModule,
    IgxPieChartCoreModule,
    IgxRingSeriesModule
} from 'igniteui-angular-charts';
import {ReportsService} from '../services/reports.service';
import { AccountChartComponent } from './account-chart/account-chart.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [ChartsPageComponent, MontlyReportComponent, AccountChartComponent],
    imports: [
        CommonModule,
        IgxDoughnutChartModule,
        IgxRingSeriesModule,
        IgxItemLegendModule,
        IgxLegendModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTabsModule,
        IgxPieChartCoreModule,
    ],
  providers: [
    ReportsService
  ]
})
export class ChartsComponentsModule {
}
