import {CalendarIncomeModel} from '../models/calendar-income.model';
import {FacadeModel} from '../../../shared/models/facade.model';

export interface EditEntryModalData {
  id: string;
  incomeChanged: CalendarIncomeModel;
  accounts: Array<FacadeModel>;

}
