import {Component, OnInit} from '@angular/core';
import {ReportTypeEnum} from '../enums/report-type.enum';
import {ReportRequestModel} from '../models/report-request.model';
import {ReportsService} from '../report.service';
import {ReportModel} from '../models/report-model';
import {CalendarService} from '../../calendar/calendar.service';
import {FacadeModel} from '../../../shared/models/facade.model';
import {ActivatedRoute} from '@angular/router';
import {FacadesViewModel} from '../../../shared/view-models/facades-view-model';
import {MatSelectChange} from '@angular/material/select';
import {BudgetReportModel} from '../../charts/models/budget-report.model';
import {BudgetRecordTypeEnum} from '../enums/budget-record-type';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {

  public reportRequest: ReportRequestModel;
  public reportData: ReportModel[];
  public categories: Array<FacadeModel>;
  public accounts: Array<FacadeModel>;
  public startDateReport: Date;
  public endDateReport: Date;

  fabButtons = [
    {
      icon: 'picture_as_pdf',
      class: 'pdf-fab'
    },
    {
      icon: 'description',
      class: 'excel-fab'
    },
  ];
  buttons = [];
  fabTogglerState = 'inactive';

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  constructor(private readonly __route: ActivatedRoute,
              private readonly _localStorage: LocalStorageService,
              private readonly _reportsService: ReportsService,
              private readonly _calendarService: CalendarService) {
  }

  ngOnInit() {
    // look for cookie params to initializa reportRequest
    this.__route.data.subscribe((r) => {
      const data: FacadesViewModel = r.data;
      this.accounts = [...data.accounts];
      this.categories = [...data.categories];

      // this.reportRequest = new ReportRequestModel();
      let reportRequest = this._localStorage.getKey(this._localStorage.budgetReportFilterName);
      console.log(reportRequest);
      // console.log());

      this.reportRequest = reportRequest != null ?
        reportRequest : new ReportRequestModel();
      // if(reportRequestFilterFromLS) != null
      this.initializeDatePickers();
      this.initializeDropDowns();
      // this.getCategories();
      // this.getAccounts();
      this.getReport({...this.reportRequest});
    });
  }

  public performReportSearch() {
    this.saveRequestParams();
    console.log('request accounts: ' + this.reportRequest.selectedAccounts);
    this._localStorage.saveKey(this._localStorage.budgetReportFilterName, this.reportRequest);
    this.getReport({...this.reportRequest});
  }


  public getAccountName(accountId: number) {
    if (this.accounts.find((a) => a.id === accountId) != null) {
      return this.accounts.find((a) => a.id === accountId).name;
    }
    return '';
  }

  public getCategoryName(categoryId: number) {
    if (this.categories.find((c) => c.id === categoryId) != null) {
      return this.categories.find((c) => c.id === categoryId).name;
    }
    return '';
  }

  private saveRequestParams() {
    // other props are saved by the ngModel in the mat-components
    this.reportRequest.startDate = this.startDateReport;
    this.reportRequest.endDate = this.endDateReport;
  }

  private initializeDatePickers() {
    // initialize date pickers to firstDateOfMonth - currentDate
    this.startDateReport = this.reportRequest.startDate;
    this.endDateReport = this.reportRequest.endDate;
  }

  public isIncome(day: ReportModel) {
    return day.budgetRecordType === BudgetRecordTypeEnum.Income;
  }

  public isExpense(day: ReportModel) {
    return day.budgetRecordType === BudgetRecordTypeEnum.Expense;
  }

  private getReport(request: ReportRequestModel) {
    this._reportsService.getReport(request).subscribe((reportResult) => {
      this.reportData = reportResult;
    });
  }

  private initializeDropDowns() {
    this.accounts.forEach((account) => this.reportRequest.selectedAccounts.push(account.id));
    this.categories.forEach((category) => this.reportRequest.selectedCategories.push(category.id));
  }


}
