import {Component, Inject, Injector, OnInit} from '@angular/core';
import {CalendarMonth} from '../../../calendar/enums/calendar-month.enum';
import {BudgetChartService} from '../../services/budget-chart.service';
import {BudgetReportRequest} from '../../models/budget-report-request.model';
import {BudgetReportType} from '../../enums/budget-report-type.enum';
import {BudgetReportModel} from '../../models/budget-report.model';
import {DecimalPipe} from '@angular/common';
import {ConstantsVariables} from '../../../../shared/constants/constants-variables';
import {BasePageComponent} from '../../../../shared/components/base-page/base-page.component';

@Component({
  selector: 'app-reports-page',
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.scss'],
  providers: [DecimalPipe]
})
export class ChartsPageComponent extends BasePageComponent implements OnInit {
  public data: any;
  public monthSelected: CalendarMonth;
  public yearSelected: number;
  public breakOptions: any;
  public months: any;
  public years: any;
  public reportRequest: BudgetReportRequest;
  public accountsReportRequest: BudgetReportRequest;
  public reportData = new Array<BudgetReportModel>();
  public accountsData = new Array<BudgetReportModel>();

  public _income = new BudgetReportModel();
  public _categories = new Array<BudgetReportModel>();
  public _totalAmountCategories: number;

  constructor(private readonly budgetChartService: BudgetChartService, private readonly _injector: Injector) {
    super(_injector);
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
    this.budgetChartService.getBudgetChartReport(request).subscribe(
      (result) => {
        this.reportData = result;
        this.mapReportDataToChartData([...this.reportData]);
        // console.log(this.reportData);
      },
      (error) => {
        this.showErrorPrompt('An error occurred when trying to load the data');
      }
    );
  }

  public getAccountsReport(accountRequest: BudgetReportRequest) {
    this.budgetChartService.getBudgetChartReport(accountRequest).subscribe(
      (result) => {
        this.accountsData = result;
        // this.mapReportDataToChartData([...this.accountsData]);
        // console.log(this.reportData);
      },
      (error) => {
        this.showErrorPrompt('An error occurred when trying to load the data');
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
      userId: this.userId,
      reportType: BudgetReportType.CategoriesReport
    };
    this.accountsReportRequest = {
      month: this.monthSelected,
      year: this.yearSelected,
      userId: this.userId,
      reportType: BudgetReportType.AccountsReport
    };
  }

  private initPageData() {
    const currentDayArray = this.getCurrentMonthAndDate();
    this.monthSelected = currentDayArray[0];
    this.yearSelected = currentDayArray[1];
    this.months = ConstantsVariables.getMonthsArray();
    this.years = ConstantsVariables.getYearsArray();
    this.breakOptions = [
      {value: 1, viewValue: 'Category'},
      {value: 2, viewValue: 'Account'}
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
          name: reportData[i].name,
          value: reportData[i].total,
        });
      }

    }
    this.data = [...dataArray];

    // console.log(dataArray);
    // console.log(this.data);
  }


}
