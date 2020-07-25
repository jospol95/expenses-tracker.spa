import {ReportTypeEnum} from '../enums/report-type.enum';

export class ReportRequestModel {
  public startDate: Date;
  public endDate: Date;
  public reportType: ReportTypeEnum;

}
