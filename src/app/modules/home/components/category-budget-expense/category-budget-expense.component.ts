import {Component, Input, OnInit} from '@angular/core';
import {CategoryBudgetExpenseViewModel} from '../../view-models/category-budget-expense-view.model';
import {CategoryModel} from '../../../../shared/models/category.model';

@Component({
  selector: 'app-category-budget-expense',
  templateUrl: './category-budget-expense.component.html',
  styleUrls: ['./category-budget-expense.component.scss']
})
export class CategoryBudgetExpenseComponent implements OnInit {

  @Input() public model: CategoryBudgetExpenseViewModel[];
  constructor() { }

  ngOnInit(): void {
  }

  public getTotalForCategory(categoryBudgetExpense: CategoryBudgetExpenseViewModel): number{
    return categoryBudgetExpense.category.budgetAssigned - categoryBudgetExpense.totalExpenseForCategory;
  }

  public isPositiveCategoryBalance(categoryBudgetExpense: CategoryBudgetExpenseViewModel): boolean{
    return this.getTotalForCategory(categoryBudgetExpense) >= 0;
  }

}
