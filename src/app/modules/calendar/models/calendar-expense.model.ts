export class CalendarExpenseModel {
  public id: string;
  public title: string;
  public date: Date;
  public description: string;
  public amount: number;
  public userId: string;
  public categoryId?: number;
  public accountId?: number;
}
