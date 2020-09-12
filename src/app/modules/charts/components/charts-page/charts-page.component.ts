import {Component, OnInit} from '@angular/core';
import {CalendarMonth} from '../../../calendar/enums/calendar-month.enum';
import {ReportsService} from '../../services/reports.service';
import {BudgetReportRequest} from '../../models/budget-report-request.model';
import {BudgetReportType} from '../../enums/budget-report-type.enum';
import {BudgetReportModel} from '../../models/budget-report.model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-reports-page',
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.scss'],
  providers: [DecimalPipe]
})
export class ChartsPageComponent implements OnInit {
  public data: any;
  public monthSelected: CalendarMonth;
  public yearSelected: number;
  public months: any;
  public years: any;
  public reportRequest: BudgetReportRequest;
  public accountsReportRequest: BudgetReportRequest;
  public reportData = new Array<BudgetReportModel>();
  public accountsData = new Array<BudgetReportModel>();

  public _income = new BudgetReportModel();
  public _categories = new Array<BudgetReportModel>();
  public _totalAmountCategories: number;

  constructor(private readonly __reportsService: ReportsService) {
    // this.data = [
    //   {Label: 'Administration', Value: 2},
    //   {Label: 'Income', Value: 8},
    //   {Label: 'IT', Value: 3},
    //   {Label: 'Marketing', Value: 8},
    //   {Label: 'Development', Value: 4},
    //   {Label: 'Customer Support', Value: 6}
    // ];
  }

  get income(): BudgetReportModel {
    this._income = {...this.reportData.find((r) => r.id === 0)};
    return this._income;
  }

  get categories(): Array<BudgetReportModel> {
    this._categories = [...this.reportData.filter((r) => r.id !== 0)];
    return this._categories;
  }

  get totalAmountCategories(): number {
    this._totalAmountCategories = 0;
    this.reportData
      .filter((r) => r.id !== 0)
      .forEach((c) => this._totalAmountCategories += c.total);
    return this._totalAmountCategories;
  }

  ngOnInit() {
    this.initPageData();
    this.initPageRequest();
    this.getReport(this.reportRequest);
    this.getAccountsReport(this.accountsReportRequest);
  }

  public getReport(budgetReportRequest: BudgetReportRequest) {
    const request = {...budgetReportRequest};
    this.__reportsService.getBudgetReport(request).subscribe(
      (result) => {
        this.reportData = result;
        this.mapReportDataToChartData([...this.reportData]);
        // console.log(this.reportData);
      },
      (error) => {
        console.log('Something bad occurred');
      }
    );
  }

  public getAccountsReport(accountRequest: BudgetReportRequest) {
    this.__reportsService.getBudgetReport(accountRequest).subscribe(
      (result) => {
        this.accountsData = result;
        // this.mapReportDataToChartData([...this.accountsData]);
        // console.log(this.reportData);
      },
      (error) => {
        console.log('Something bad occurred');
      }
    );
  }

  public handleDateSelection() {
    // refresh page
  }

  private initPageRequest() {
    this.reportRequest = {
      month: this.monthSelected,
      year: this.yearSelected,
      userId: '123',
      reportType: BudgetReportType.CategoriesReport
    };
    this.accountsReportRequest = {
      month: this.monthSelected,
      year: this.yearSelected,
      userId: '123',
      reportType: BudgetReportType.AccountsReport
    };
  }

  private initPageData() {
    const currentDayArray = this.getCurrentMonthAndDate();
    this.monthSelected = currentDayArray[0];
    this.yearSelected = currentDayArray[1];

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

  private getCurrentMonthAndDate(): [CalendarMonth, number] {
    const currentDate = new Date();
    const currentMonth: CalendarMonth = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();
    return [currentMonth, currentYear];
  }

  private mapReportDataToChartData(reportData: Array<BudgetReportModel>) {
    const dataArray = new Array<any>();
    let budgetReportTotal = 0;
    reportData.forEach((r) => budgetReportTotal += r.total);

    for (let i = 0; i < reportData.length; i++) {
      // const labelData = {
      //   Label: reportData[i].name,
      //   Value: reportData[i].total
      // };
      if (reportData[i].id !== 0) {
        dataArray.push({
          Label: reportData[i].name,
          // Idea is to have always a match-value of 100
          Value: Math.abs((reportData[i].total / budgetReportTotal))
        });
      }

    }
    this.data = [...dataArray];

    console.log(dataArray);
    console.log(this.data);
  }


}
