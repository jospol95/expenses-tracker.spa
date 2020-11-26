import {Component, Injector, OnInit} from '@angular/core';
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
import {LocalStorageKeysNameEnum} from '../../../shared/enums/local-storage-keys-name.enum';
import {BasePageComponent} from '../../../shared/components/base-page/base-page.component';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent extends BasePageComponent implements OnInit {

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
              private readonly _injector: Injector,
              private readonly _localStorage: LocalStorageService,
              private readonly _reportsService: ReportsService) {
    super(_injector);
  }

  ngOnInit() {
    // look for cookie params to initializa reportRequest
    this.__route.data.subscribe((r) => {
      const data: FacadesViewModel = r.data;
      this.accounts = [...data.accounts];
      this.categories = [...data.categories];

      const localStorageReportRequest = this._localStorage.getKey(LocalStorageKeysNameEnum.budgetReportKey);
      this.reportRequest = localStorageReportRequest != null ?
        localStorageReportRequest : this.initializeAndGetNewReportRequest();

      this.initializeDatePickers();
      this.getReport({...this.reportRequest});
    });
  }

  public performReportSearch() {
    this.saveRequestParams();
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
    this._localStorage.saveValueWithKey(this.reportRequest, LocalStorageKeysNameEnum.budgetReportKey);

  }

  private initializeAndGetNewReportRequest() {
    const newReportRequest = new ReportRequestModel();
    this.accounts.forEach(
      (account) => newReportRequest.selectedAccounts.push(account.id));
    this.categories.forEach(
      (category) => newReportRequest.selectedCategories.push(category.id));
    return {...newReportRequest};
  }

  private initializeDatePickers(){
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
    request.userId = this._authService.getUserId();
    this._reportsService.getReport(request).subscribe((reportResult) => {
      this.reportData = reportResult;
    });
  }
}
