import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarDay} from '../../../models/calendar-day.model';
import {CalendarArrayModel} from '../../../models/calendar-array.model';

@Component({
  selector: 'app-calendar-number',
  templateUrl: './calendar-number.component.html',
  styleUrls: ['./calendar-number.component.scss']
})
export class CalendarNumberComponent implements OnInit {
  @Input() public model: CalendarArrayModel;
  // @Input() public model: CalendarDay;
  @Input() public columnIndex: number;
  @Input() public rowIndex: number;

  @Output() public dayClicked = new EventEmitter<[number, number]>();

  public _hasExpensesOrIncomes: boolean;

  constructor() { }

  ngOnInit() {
  }

  get hasExpensesOrIncomes(): boolean {
    if (this.model.budgetForDay) {
      this._hasExpensesOrIncomes =
        (this.model.budgetForDay.expenses.length > 0 || this.model.budgetForDay.incomes.length > 0);
    } else {
      this._hasExpensesOrIncomes = false;
    }
    return this._hasExpensesOrIncomes;

  }

  public onClicked() {
    // this.model.clicked = true;
    // should be an event emitter to the upper to negate everything else
    this.dayClicked.emit([this.rowIndex, this.columnIndex]);
  }
}
