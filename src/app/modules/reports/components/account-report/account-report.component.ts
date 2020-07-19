import {Component, Input, OnInit} from '@angular/core';
import {CalendarMonth} from '../../../calendar/enums/calendar-month.enum';
import {BudgetReportRequest} from '../../models/budget-report-request.model';
import {BudgetReportModel} from '../../models/budget-report.model';
import {noop} from 'rxjs';

@Component({
  selector: 'app-account-report',
  templateUrl: './account-report.component.html',
  styleUrls: ['./account-report.component.scss']
})
export class AccountReportComponent implements OnInit {
  // @Input() public reportData = new Array<BudgetReportModel>()

  @Input() set reportData(value: Array<BudgetReportModel>) {
    this._reportData = value;
    this.convertToChartData([...value]);
    console.log(this.chartData);
  }

  public monthSelected: CalendarMonth;
  public yearSelected: number;
  public months: any;
  public years: any;
  public chartData: any;

  // public reportRequest: BudgetReportRequest;

  public _reportData: any;
  public _income = new BudgetReportModel();
  public _accounts = new Array<BudgetReportModel>();
  public _totalAmountaccounts: number;

  constructor() {
  }

  // get chartData() {
  //
  //   console.log(this._chartData);
  //   return this._chartData;
  // }

  ngOnInit() {
  }

  public handleDateSelection() {
    noop();
  }

  private convertToChartData(reportData: Array<BudgetReportModel>) {
    if (reportData != null) {
      const dataArray = new Array<any>();
      let accountReportTotal = 0;
      reportData
        .forEach((r) => accountReportTotal += r.total);

      for (let i = 0; i < reportData.length; i++) {
        // const labelData = {
        //   Label: reportData[i].name,
        //   Value: reportData[i].total
        // };
        dataArray.push({
          Label: reportData[i].name,
          // Idea is to have always a match-value of 100
          Value: Math.abs((reportData[i].total / accountReportTotal))
        });
      }
      this.chartData = [...dataArray];
    }
  }

}
