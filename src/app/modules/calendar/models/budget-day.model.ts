import {CalendarExpenseModel} from './calendar-expense.model';
import {CalendarIncomeModel} from './calendar-income.model';

export class BudgetDayModel {
  public fullDate: string;
  public day: number;
  public month: number;
  public year: number;
  public expenses: CalendarExpenseModel[];
  public incomes: CalendarIncomeModel[];
}
