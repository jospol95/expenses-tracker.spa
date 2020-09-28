import {Injectable} from '@angular/core';
import {ReportRequestModel} from '../../modules/reports/models/report-request.model';
import {ReportRequestFilterModel} from '../models/report-request-filter.model';
import {type} from 'os';
import {noop} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public budgetReportFilter = new ReportRequestFilterModel('budget-report-filter', new ReportRequestModel());
  public budgetReportFilterName = 'budget-report-filter';
  // public budgetReportFilter: ReportRequestModel;

  constructor() {

  }

  public getKey(keyName: string) {
    const savedFilter = localStorage.getItem(keyName);
    console.log(savedFilter);
    if (savedFilter != null) {
      // console.log(JSON.parse(savedFilter));
      return JSON.parse(savedFilter);
    }
    return null;
  }

  public saveKey(keyName: string, value) {
    localStorage.setItem(keyName, JSON.stringify(value));
  }

  // public getBudgetReportFilter(): ReportRequestModel {
  //   const filterValue = this.getLocalStorageKey(this.budgetReportFilter) != null;
  //   this.budgetReportFilter.value = filterValue != null ? filterValue : new ReportRequestModel();
  //   return this.budgetReportFilter.value;
  // }

  // public saveFilterToLocalStorage(filter: any | ReportRequestModel) {
  //   // type filterType = typeof filter;
  //   switch (filter) {
  //     case filter instanceof (ReportRequestModel):
  //       this.budgetReportFilter.value = filter;
  //       this.upsertLocalStorageKey(this.budgetReportFilter.filterName, this.budgetReportFilter.value);
  //       break;
  //     default:
  //       noop();
  //   }
  // }

  // private saveFilterToLocalStorage(filter: ReportRequestFilterModel) {
  //   this.upsertLocalStorageKey(filter.filterName, filter.value);
  // }

  private upsertLocalStorageKey(keyName: string, value: any) {
    localStorage.setItem(keyName, value);
  }

  private getLocalStorageKey(filter: ReportRequestFilterModel) {
    const savedFilter = localStorage.getItem(filter.filterName);
    if (savedFilter != null) {
      return JSON.parse(savedFilter);
    }
    return null;
  }

}
