import { Component, OnInit } from '@angular/core';
import {CalendarDay} from '../../models/calendar-day.model';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss']
})
export class CalendarContainerComponent implements OnInit {

  public months: any;
  public years: any;
  public dayHeaders: any;
  public days: any;
  public rowsDays;
  constructor() { }

  ngOnInit() {
    this.months = [
      {value: 1, viewValue: 'January'},
      {value: 2, viewValue: 'February'},
      {value: 3, viewValue: 'March'},
      {value: 4, viewValue: 'April'},
      {value: 5, viewValue: 'May'},
      {value: 6, viewValue: 'June'},
      {value: 7, viewValue: 'July'},
    ];
    this.years = [
      {value: 2019, viewValue: '2019'},
      {value: 2020, viewValue: '2020'},
    ];
    this.dayHeaders = [
      {name: 'MON', isActive: false},
      {name: 'TUE', isActive: false},
      {name: 'WED', isActive: false},
      {name: 'THU', isActive: false},
      {name: 'FRI', isActive: false},
      {name: 'SAT', isActive: false},
      {name: 'SUN', isActive: true},
    ];
    this.rowsDays = [
      [
        {value: 1, isToday: true, hasExpenses: true, clicked: true},
        {value: 2, isToday: true, hasExpenses: false, clicked: false},
        {value: 3, isToday: false, hasExpenses: false, clicked: false},
        {value: 4, isToday: false, hasExpenses: false, clicked: false},
        {value: 5, isToday: false, hasExpenses: true, clicked: false},
        {value: 6, isToday: false, hasExpenses: false, clicked: false},
        {value: 7, isToday: false, hasExpenses: false, clicked: false},
      ],
      [
        {value: 8, isToday: false, hasExpenses: false, clicked: false},
        {value: 9, isToday: false, hasExpenses: false, clicked: false},
        {value: 10, isToday: false, hasExpenses: false, clicked: false},
        {value: 11, isToday: false, hasExpenses: true, clicked: false},
        {value: 12, isToday: false, hasExpenses: false, clicked: false},
        {value: 13, isToday: false, hasExpenses: false, clicked: false},
        {value: 14, isToday: false, hasExpenses: false, clicked: false},
      ]
    ];
    this.days = [
      {value: 1, isToday: true, hasExpenses: true, clicked: false},
      {value: 2, isToday: false, hasExpenses: false, clicked: false},
      {value: 3, isToday: false, hasExpenses: false, clicked: false},
      {value: 4, isToday: false, hasExpenses: false, clicked: false},
      {value: 5, isToday: false, hasExpenses: true, clicked: false},
      {value: 6, isToday: false, hasExpenses: false, clicked: false},
      {value: 7, isToday: false, hasExpenses: false, clicked: false},
      {value: 8, isToday: false, hasExpenses: false, clicked: false},
      {value: 9, isToday: false, hasExpenses: false, clicked: false},
      {value: 10, isToday: false, hasExpenses: false, clicked: false},
      {value: 11, isToday: false, hasExpenses: true, clicked: false},
      {value: 12, isToday: false, hasExpenses: false, clicked: false},
      {value: 13, isToday: false, hasExpenses: false, clicked: false},
      {value: 14, isToday: false, hasExpenses: false, clicked: false},
      {value: 15, isToday: false, hasExpenses: false, clicked: false},
    ];
  }

  public onDayClickedHandler($event: [number, number]) {

    this.rowsDays[0].forEach((day: CalendarDay) => day.clicked = false );
    this.rowsDays[1].forEach((day: CalendarDay) => day.clicked = false );

    const roxIndex = $event[0];
    const dayIndex = $event[1];
    this.rowsDays[roxIndex][dayIndex].clicked = true;
  }
}
