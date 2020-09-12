import {BudgetDayModel} from '../../calendar/models/budget-day.model';
import {FacadeModel} from '../../../shared/models/facade.model';
import {CategoryModel} from '../../../shared/models/category.model';

export class HomePageViewModel {
  public budgetDays: BudgetDayModel[];
  public accounts: FacadeModel[];
  public categories: CategoryModel[];
}
