import {Component, Input, OnInit} from '@angular/core';
import {CategoryBudgetExpenseViewModel} from '../../../view-models/category-budget-expense-view.model';
import {CategoryModel} from '../../../../../shared/models/category.model';

@Component({
  selector: 'app-budget-home',
  templateUrl: './budget-home.component.html',
  styleUrls: ['./budget-home.component.scss']
})
export class BudgetHomeComponent implements OnInit {
  @Input() model: CategoryBudgetExpenseViewModel[];
  @Input() categories: CategoryModel[];
  @Input() expensesTotal: number;
  public categoriesTotal = 0;

  constructor() { }

  ngOnInit(): void {
    this.calculateCategoriesTotal();
  }

  public calculateCategoriesTotal(){
    this.categories.forEach((cat) => this.categoriesTotal += cat.budgetAssigned);
  }

}
