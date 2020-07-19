import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarExpenseModel} from '../../../models/calendar-expense.model';
import {FacadeModel} from '../../../../../shared/facade.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  @Input() public categories: Array<FacadeModel>;
  @Input() public accounts: Array<FacadeModel>;

  @Output() public saveEvent = new EventEmitter<CalendarExpenseModel>();
  @Output() public cancelEvent = new EventEmitter();

  public model: CalendarExpenseModel;
  constructor() { }

  ngOnInit() {
    this.model = new CalendarExpenseModel();
  }

  public cancel(){

  }

  public save(){
    this.saveEvent.emit(this.model);
  }

}
