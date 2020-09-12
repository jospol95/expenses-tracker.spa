import {BudgetRecordTypeEnum} from '../enums/budget-record-type';

export class ReportModel{
  public date: Date;
  public description: string;
  public amount: number;
  public categoryId: number;
  public accountId: number;
  public budgetRecordType: BudgetRecordTypeEnum;
}

