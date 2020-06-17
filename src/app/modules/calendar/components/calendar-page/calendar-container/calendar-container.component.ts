import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarDay} from '../../../models/calendar-day.model';
import {CalendarModel} from '../../../models/calendar.model';
import {CalendarMonth} from '../../../enums/calendar-month.enum';
import {CalendarArrayModel} from '../../../models/calendar-array.model';
import {debug} from 'util';
import {MatOptionSelectionChange} from '@angular/material';
import {Router} from '@angular/router';
import {BudgetDayModel} from '../../../models/budget-day.model';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss']
})
export class CalendarContainerComponent implements OnInit {
  @Input() budgetDays: Array<BudgetDayModel>;

  @Output() clickedDateEvent = new EventEmitter<number>();
  @Output() selectedDateChangedEvent = new EventEmitter<[CalendarMonth, number, number]>();

  public calendarLineal = new CalendarModel();
  public months: any;
  public model: Array<Array<CalendarArrayModel>>;
  public years: any;
  public dayHeaders: any;

  public monthSelected: CalendarMonth;
  public yearSelected: number;
  public daySelected: number;

  private _selectedDateNumberArray: [CalendarMonth, number, number];

  constructor() { }

  private static getCurrentMonthAndDate(): [CalendarMonth, number] {
    const currentDate = new Date();
    const currentMonth: CalendarMonth = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();
    return [currentMonth, currentYear];
  }

  get selectedDateNumberArray(): [CalendarMonth, number, number] {
    this._selectedDateNumberArray = [this.monthSelected, this.daySelected, this.yearSelected];
    return this._selectedDateNumberArray;
  }

  ngOnInit() {

    this.months = [
      {value: 0, viewValue: 'January'},
      {value: 1, viewValue: 'February'},
      {value: 2, viewValue: 'March'},
      {value: 3, viewValue: 'April'},
      {value: 4, viewValue: 'May'},
      {value: 5, viewValue: 'June'},
      {value: 6, viewValue: 'July'},
      {value: 7, viewValue: 'August'},
      {value: 8, viewValue: 'September'},
      {value: 9, viewValue: 'October'},
      {value: 10, viewValue: 'November'},
      {value: 11, viewValue: 'December'},
    ];
    this.years = [
      {value: 2019, viewValue: '2019'},
      {value: 2020, viewValue: '2020'},
    ];
    this.dayHeaders = [
      {name: 'SUN', isActive: false},
      {name: 'MON', isActive: false},
      {name: 'TUE', isActive: false},
      {name: 'WED', isActive: false},
      {name: 'THU', isActive: false},
      {name: 'FRI', isActive: false},
      {name: 'SAT', isActive: true},
    ];
    // this.rowsDays = [
    //   [
    //     {value: 1, isToday: true, hasExpenses: true, clicked: true},
    //     {value: 2, isToday: true, hasExpenses: false, clicked: false},
    //     {value: 3, isToday: false, hasExpenses: false, clicked: false},
    //     {value: 4, isToday: false, hasExpenses: false, clicked: false},
    //     {value: 5, isToday: false, hasExpenses: true, clicked: false},
    //     {value: 6, isToday: false, hasExpenses: false, clicked: false},
    //     {value: 7, isToday: false, hasExpenses: false, clicked: false},
    //   ],
    //   [
    //     {value: 8, isToday: false, hasExpenses: false, clicked: false},
    //     {value: 9, isToday: false, hasExpenses: false, clicked: false},
    //     {value: 10, isToday: false, hasExpenses: false, clicked: false},
    //     {value: 11, isToday: false, hasExpenses: true, clicked: false},
    //     {value: 12, isToday: false, hasExpenses: false, clicked: false},
    //     {value: 13, isToday: false, hasExpenses: false, clicked: false},
    //     {value: 14, isToday: false, hasExpenses: false, clicked: false},
    //   ]
    // ];
    // this.days = [
    //   {value: 1, isToday: true, hasExpenses: true, clicked: false},
    //   {value: 2, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 3, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 4, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 5, isToday: false, hasExpenses: true, clicked: false},
    //   {value: 6, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 7, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 8, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 9, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 10, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 11, isToday: false, hasExpenses: true, clicked: false},
    //   {value: 12, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 13, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 14, isToday: false, hasExpenses: false, clicked: false},
    //   {value: 15, isToday: false, hasExpenses: false, clicked: false},
    // ];
    const currentDate: [CalendarMonth, number] = CalendarContainerComponent.getCurrentMonthAndDate();
    this.monthSelected = currentDate[0];
    this.yearSelected = currentDate[1];
    // calculate inner array for linear calendar
    this.calculateCalendar( this.monthSelected, this.yearSelected);
    // sets todays date (if theres) to clicked
    this.setClickedToToday();
    // pops up selectedDateChanged
    this.selectedDateChangedEvent.emit(this.selectedDateNumberArray);
  }

  public onDayClickedHandler($event: [number, number]) {
    // $event[rowNumberOfClicked, columnOfClicked]

    this.model.forEach((row) => row.forEach((day) => day.clicked = false));
    const rowIndex = $event[0];
    const columnIndex = $event[1];
    this.model[rowIndex][columnIndex].clicked = true;
    this.daySelected = this.model[rowIndex][columnIndex].dayNumber;
    // this.selectedDateChangedEvent.emit(this.selectedDateNumberArray);
    this.clickedDateEvent.emit(this.daySelected);
  }

  public addNewClickedEventHandler($event) {
    // todo -> event should be of type request: income/expense, then navigate to income/expense accodingly

  }

  public handleDateSelection() {
    this.calculateCalendar(this.monthSelected, this.yearSelected);
    this.selectedDateChangedEvent.emit(this.selectedDateNumberArray);
  }

  private  mapBudgetDaysToCalendar() {
    if (this.budgetDays != null) {
      this.budgetDays.forEach((budgetDay) => {
        const dayNumber = budgetDay.day;
        const index = this.calendarLineal.calendar
          .findIndex((c) => c.dayNumber === dayNumber);
        this.calendarLineal.calendar[index].budgetForDay = budgetDay;
      });
    }
  }

  private setClickedToToday() {
    let row = 0;
    let column = 0;
    // const active = this.model[1]
    //   .find((day) => day.isToday === false);
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        // row[i][j] = this.model.calendar[arrayCount];
        if (this.model[i][j].isToday === true) {
          row = i;
          column = j;
        }
      }
    }
    this.model[row][column].clicked = true;
    this.daySelected = this.model[row][column].dayNumber;
  }

  private calculateCalendar(selectedMonth: CalendarMonth, selectedYear: number) {
    this.calendarLineal.calculateDaysNumberForArray(selectedMonth, selectedYear);
    // maps budgetDays -> calendarLineal
    this.mapBudgetDaysToCalendar();
    // creates bidimensional array
    this.calendarToBidimensional();
  }

  private calendarToBidimensional() {
      const rows = 6;
      const columns = 7;
      const calendar = new Array<Array<CalendarArrayModel>>();
      let arrayCount = 0;

      for (let i = 0; i < rows; i++) {
        const row = new Array<any>();
        for (let j = 0; j < columns; j++) {
          // row[i][j] = this.model.calendar[arrayCount];
          row.push(this.calendarLineal.calendar[arrayCount]);
          arrayCount++;
        }
        calendar.push(row);
      }
      this.model = calendar;
  }


}
