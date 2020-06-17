import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarExpenseModel} from '../../../models/calendar-expense.model';
import {CalendarIncomeModel} from '../../../models/calendar-income.model';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {

  @Output() public saveEvent = new EventEmitter<CalendarIncomeModel>();
  @Output() public cancelEvent = new EventEmitter();

  public model: CalendarIncomeModel;
  constructor() { }

  ngOnInit() {
    this.model = new CalendarIncomeModel();
  }

  public cancel() {
    this.cancelEvent.emit();
  }

  public save() {
    this.saveEvent.emit(this.model);
  }

}
