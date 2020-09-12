import {BudgetDayModel} from '../models/budget-day.model';
import {FacadeModel} from '../../../shared/models/facade.model';

export class CalendarPageViewModel {
  public budgetDays: BudgetDayModel[];
  public categories: Array<FacadeModel>;
  public accounts: Array<FacadeModel>;

  public CalendarPageViewModel(){
    this.categories = new Array<FacadeModel>();
    this.accounts = new Array<FacadeModel>();
  }
}
