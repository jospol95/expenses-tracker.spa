import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarModel} from '../../../models/calendar.model';
import {CalendarMonth} from '../../../enums/calendar-month.enum';
import {CalendarArrayModel} from '../../../models/calendar-array.model';
import {BudgetDayModel} from '../../../models/budget-day.model';
import {MonthName} from '../../../../../shared/enums/month-name.enum';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss']
})
export class CalendarContainerComponent implements OnInit {
  @Input() _budgetDays: Array<BudgetDayModel>;
  @Input() public daySelected: number;

  @Output() clickedDateEvent = new EventEmitter<number>();
  @Output() selectedDateChangedEvent = new EventEmitter<[CalendarMonth, number, number]>();

  public calendarLineal = new CalendarModel();
  public months: any;
  public years: any;
  public dayHeaders: any;
  public monthSelected: CalendarMonth;
  public yearSelected: number;
  public model: Array<Array<CalendarArrayModel>>;
  public selectedMonth: any;

  private _selectedDateNumberArray: [CalendarMonth, number, number];

  @Input() set budgetDays(value: Array<BudgetDayModel>) {
    this._budgetDays = [...value];
    // Convert calendar to inner model when budgetDay changes
    if (this.budgetDays && this.monthSelected && this.yearSelected) {
      this.calculateCalendar(this.monthSelected, this.yearSelected);
    }
  }

  get budgetDays() {
    return this._budgetDays;
  }

  constructor() {
  }

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
    const currentDate: [CalendarMonth, number] = CalendarContainerComponent.getCurrentMonthAndDate();
    this.monthSelected = currentDate[0];
    this.yearSelected = currentDate[1];
    // console.log(this.model);
    // console.log(this.model[0]);
    // calculate inner array for linear calendar
    console.log('init');
    this.calculateCalendar(this.monthSelected, this.yearSelected);

    // sets todays date (if theres) to clicked
    this.setClickedToToday();
    // pops up selectedDateChanged
    // TODO get rid of, this is calling the upper component onInit
    // this.selectedDateChangedEvent.emit(this.selectedDateNumberArray);
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

  public getMonthName(){
    return CalendarMonth[this.monthSelected];
  }

  public handleDateSelection() {
    // this.calculateCalendar(this.monthSelected, this.yearSelected);
    this.selectedDateChangedEvent.emit(this.selectedDateNumberArray);
  }

  private mapBudgetDaysToCalendar() {
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


  ConvertToJSON(prop: any) {
    return JSON.parse(prop);
  }
}
