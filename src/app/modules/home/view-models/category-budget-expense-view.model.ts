import {CategoryModel} from '../../../shared/models/category.model';

export class CategoryBudgetExpenseViewModel {
  public category: CategoryModel;
  public totalExpenseForCategory: number;


  // getBudgetedVsTotal(): number{
  //   return this.category.budgetAssigned - this.totalExpenseForCategory;
  // }
  //
  // isBalancePositive(): boolean{
  //   return this.getBudgetedVsTotal() > 0;
  // }

}
