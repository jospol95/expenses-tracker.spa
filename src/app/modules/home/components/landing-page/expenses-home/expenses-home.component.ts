import {Component, Input, OnInit} from '@angular/core';
import {CalendarIncomeModel} from '../../../../calendar/models/calendar-income.model';
import {CalendarExpenseModel} from '../../../../calendar/models/calendar-expense.model';
import {FacadeModel} from '../../../../../shared/models/facade.model';

@Component({
  selector: 'app-expenses-home',
  templateUrl: './expenses-home.component.html',
  styleUrls: ['./expenses-home.component.scss']
})
export class ExpensesHomeComponent implements OnInit {
  @Input() model: CalendarExpenseModel[];
  @Input() categories: FacadeModel[];
  @Input() expensesTotal: number;
  public chartData = new Array<{ name: string, value: number }>();

  constructor() { }

  ngOnInit(): void {
    this.buildIncomeChartData();
  }

  private buildIncomeChartData() {
    this.categories.forEach((a) => {
      const totalForCategory = this.getTotalForCategory(a.id);
      if (totalForCategory > 0) {
        this.chartData.push({
          name: a.name,
          value: totalForCategory
        });
      }
    });
  }

  private getTotalForCategory(categoryId){
    let totalCategory = 0;
    this.model.filter((i) => i.categoryId === categoryId)
      .forEach((ia) => totalCategory += ia.amount);
    return totalCategory;
  }

}
