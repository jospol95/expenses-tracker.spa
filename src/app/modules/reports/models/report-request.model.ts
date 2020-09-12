import {ReportTypeEnum} from '../enums/report-type.enum';

export class ReportRequestModel {
  public startDate: Date;
  public endDate: Date;
  public selectedCategories: number[];
  public selectedAccounts: number[];

  constructor() {
    const currentDate = new Date();
    this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.endDate = currentDate;
    this.selectedAccounts = new Array<number>();
    this.selectedCategories = new Array<number>();
  }
}
