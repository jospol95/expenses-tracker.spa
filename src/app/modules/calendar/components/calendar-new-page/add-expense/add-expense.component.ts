import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarExpenseModel} from '../../../models/calendar-expense.model';
import {FacadeModel} from '../../../../../shared/models/facade.model';
import {CalendarBudgetEntryType} from '../../../enums/calendar-budget-entry.enum';
import {CalendarIncomeModel} from '../../../models/calendar-income.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  @Input() public categories: Array<FacadeModel>;
  @Input() public accounts: Array<FacadeModel>;
  @Input() public model: CalendarExpenseModel;

  @Output() public saveEvent = new EventEmitter<[CalendarIncomeModel, CalendarBudgetEntryType]>();
  @Output() public cancelEvent = new EventEmitter();

  // public model: CalendarExpenseModel;

  constructor() {
    // this.model = new CalendarExpenseModel();
  }

  ngOnInit() {
    // this.model = new CalendarExpenseModel();
  }

  public cancel() {

  }

  public save() {
    this.saveEvent.emit([this.model, CalendarBudgetEntryType.Expense]);
  }

}
