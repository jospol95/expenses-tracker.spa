import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarExpenseModel} from '../../../models/calendar-expense.model';
import {CalendarIncomeModel} from '../../../models/calendar-income.model';
import {FacadeModel} from '../../../../../shared/models/facade.model';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {
  @Input() public accounts: Array<FacadeModel>;
  @Input() public model: CalendarIncomeModel;

  @Output() public saveEvent = new EventEmitter<CalendarIncomeModel>();
  @Output() public cancelEvent = new EventEmitter();


  // public model: CalendarIncomeModel;

  constructor() {
    // this.model = new CalendarIncomeModel();
  }

  ngOnInit() {
    // this.model = new CalendarIncomeModel();
  }

  public cancel() {
    this.cancelEvent.emit();
  }

  public save() {
    this.saveEvent.emit(this.model);
  }

}
