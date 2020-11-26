import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReportRequestModel} from './models/report-request.model';
import {BudgetReportModel} from '../charts/models/budget-report.model';
import {Observable} from 'rxjs';
import {ReportModel} from './models/report-model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReportsService {

  private reportsUrl = environment.BUDGET_API + '/v1/Reports/';

  constructor(private readonly _http: HttpClient) {

  }

  public getReport(request: ReportRequestModel): Observable<Array<ReportModel>> {
    return this._http.post<Array<ReportModel>>(this.reportsUrl + 'getReport', request );
  }
}

