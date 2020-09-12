import {CalendarExpenseModel} from '../models/calendar-expense.model';
import {FacadeModel} from '../../../shared/models/facade.model';

export interface EditExpenseDialogData {
  id: string;
  expenseChanged: CalendarExpenseModel;
  categories: Array<FacadeModel>;
  accounts: Array<FacadeModel>;
}
