import {ReportRequestModel} from '../../modules/reports/models/report-request.model';

export class ReportRequestFilterModel {
  // filter name is the name of the local storage key
  public filterName: string;
  // request maps the retrieved key to the provided model
  public value: any | ReportRequestModel;

  constructor(filterName: string, value: any | ReportRequestModel) {
    this.filterName = filterName;
    this.value = value;
  }
}
