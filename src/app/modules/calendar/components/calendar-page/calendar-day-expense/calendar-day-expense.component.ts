import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {noop} from 'rxjs';
import {BudgetDayModel} from '../../../models/budget-day.model';

@Component({
  selector: 'app-calendar-day-expense',
  templateUrl: './calendar-day-expense.component.html',
  styleUrls: ['./calendar-day-expense.component.scss']
})
export class CalendarDayExpenseComponent implements OnInit {
  @Input() public budgetDay: BudgetDayModel;
  @Output() public addNewClickedEvent = new EventEmitter<null>();

  public _labeledMonth: string;
  public _labeledDay: string;
  public _budgetDayTotal = 0;
  public _hasIncomesOrExpenses: boolean;

  // todo rename component
  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  get hasIncomesOrExpenses(): boolean {
    this._hasIncomesOrExpenses = (this.budgetDay.expenses.length > 0 || this.budgetDay.incomes.length > 0);
    return this._hasIncomesOrExpenses;
  }

  get budgetDayTotal(): number {
    let incomesTotal = 0;
    let expensesTotal = 0;
    this.budgetDay.incomes
      .forEach((i) => incomesTotal += i.amount);
    this.budgetDay.expenses
      .forEach((e) => expensesTotal += e.amount);
    this._budgetDayTotal = (incomesTotal - expensesTotal);
    return this.roundWithTwoDecimals(this._budgetDayTotal);
  }

  public addNew() {
    this.addNewClickedEvent.emit(null);
  }

  private roundWithTwoDecimals(num) {
    return +Math.round( num * 100 + Number.EPSILON ) / 100;
  }

  private getTotalAbs() {
    return Math.abs(this.budgetDayTotal);
  }

  goToAddNew() {
    this.router.navigate(
      ['calendar/new'],
      {queryParams: {day: 31, month: '1', year: '2019'}}
      )
      .then((r) => noop());
  }
}
