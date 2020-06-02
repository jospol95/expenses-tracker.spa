import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarDay} from '../../../models/calendar-day.model';

@Component({
  selector: 'app-calendar-number',
  templateUrl: './calendar-number.component.html',
  styleUrls: ['./calendar-number.component.scss']
})
export class CalendarNumberComponent implements OnInit {
  @Input() public model: CalendarDay;
  @Input() public arrayIndex: number;
  @Input() public rowIndex: number;
  @Output() public dayClicked = new EventEmitter<[number, number]>();
  constructor() { }

  ngOnInit() {
  }

  public onClicked() {
    this.dayClicked.emit([this.rowIndex, this.arrayIndex]);
  }
}
