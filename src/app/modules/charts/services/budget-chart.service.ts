import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BudgetReportRequest} from '../models/budget-report-request.model';
import {Observable} from 'rxjs';
import {BudgetReportModel} from '../models/budget-report.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private genericBudgetUrl = environment.BUDGET_API + '/v1/Budget/';

  constructor(private readonly http: HttpClient) {

  }

  public getBudgetReport(request: BudgetReportRequest): Observable<Array<BudgetReportModel>> {
    return this.http.post<Array<BudgetReportModel>>(this.genericBudgetUrl + 'getBudgetReport', request);
  }
}
