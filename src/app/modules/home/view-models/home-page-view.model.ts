import {BudgetDayModel} from '../../calendar/models/budget-day.model';
import {FacadeModel} from '../../../shared/facade.model';

export class HomePageViewModel {
  public budgetDays: BudgetDayModel[];
  public accounts: FacadeModel[];
  public categories: FacadeModel[];
}
