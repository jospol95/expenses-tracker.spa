import {BudgetReportType} from '../enums/budget-report-type.enum';
import {CalendarMonth} from '../../calendar/enums/calendar-month.enum';

export class BudgetReportRequest {
  public month: CalendarMonth;
  public year: number;
  public userId: string;
  public reportType: BudgetReportType;
}
