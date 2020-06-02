import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsPageComponent } from './reports-page/reports-page.component';
import { MontlyReportComponent } from './montly-report/montly-report.component';
import {IgxDoughnutChartModule, IgxItemLegendModule, IgxLegendModule, IgxRingSeriesModule} from 'igniteui-angular-charts';




@NgModule({
  declarations: [ReportsPageComponent, MontlyReportComponent],
  imports: [
    CommonModule,
    IgxDoughnutChartModule,
    IgxRingSeriesModule,
    IgxItemLegendModule,
    IgxLegendModule,
  ]
})
export class ReportsComponentsModule { }
