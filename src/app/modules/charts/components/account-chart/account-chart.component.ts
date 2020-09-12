import {Component, Input, OnInit} from '@angular/core';
import {CalendarMonth} from '../../../calendar/enums/calendar-month.enum';
import {BudgetReportRequest} from '../../models/budget-report-request.model';
import {BudgetReportModel} from '../../models/budget-report.model';
import {noop} from 'rxjs';

@Component({
  selector: 'app-account-report',
  templateUrl: './account-chart.component.html',
  styleUrls: ['./account-chart.component.scss']
})
export class AccountChartComponent implements OnInit {
  // @Input() public reportData = new Array<BudgetReportModel>()

  @Input() set reportData(value: Array<BudgetReportModel>) {
    this._reportData = value;
    this.convertToChartData([...value]);
    this.setTotalAmount([...value]);
  }

  @Input() yearSelected: number;
  @Input() monthSelected: CalendarMonth;

  // public monthSelected: CalendarMonth;
  // public yearSelected: number;
  public months: any;
  public years: any;
  public chartData: any;
  public _reportData: Array<BudgetReportModel>;
  public _income = new BudgetReportModel();
  public _accounts = new Array<BudgetReportModel>();
  public totalAmountAccounts = 0;


  constructor() {
  }


  ngOnInit() {

    this.months = [
      {value: 0, viewValue: 'January'},
      {value: 1, viewValue: 'February'},
      {value: 2, viewValue: 'March'},
      {value: 3, viewValue: 'April'},
      {value: 4, viewValue: 'May'},
      {value: 5, viewValue: 'June'},
      {value: 6, viewValue: 'July'},
      {value: 7, viewValue: 'August'},
      {value: 8, viewValue: 'September'},
      {value: 9, viewValue: 'October'},
      {value: 10, viewValue: 'November'},
      {value: 11, viewValue: 'December'},
    ];

    this.years = [
      {value: 2019, viewValue: '2019'},
      {value: 2020, viewValue: '2020'},
    ];
  }

  public handleDateSelection() {
    noop();
  }

  public setTotalAmount(reportData: Array<BudgetReportModel>) {
    // this._totalAmountCategories = 0;
    if (reportData != null) {
      reportData
        // .filter((r) => r.id !== 0)
        .forEach((c) => this.totalAmountAccounts += c.total);
      // return this._totalAmountAccounts;
    }

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
