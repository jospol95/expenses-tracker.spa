import {ReportTypeEnum} from '../enums/report-type.enum';

export class ReportRequestModel {
  public userId: string;
  public startDate: Date;
  public endDate: Date;
  public selectedCategories: number[];
  public selectedAccounts: number[];
  public includeIncome: boolean;

  constructor() {
    const currentDate = new Date();
    this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.endDate = currentDate;
    this.selectedAccounts = new Array<number>();
    this.selectedCategories = new Array<number>();
    this.includeIncome = true;
  }
}
