export class CalendarIncomeModel {
  public id: string;
  public title: string;
  public date: Date;
  public description: string;
  public amount: number;
  public userId: string;
  public accountId?: number;
  public isConcurrent = false;
}
