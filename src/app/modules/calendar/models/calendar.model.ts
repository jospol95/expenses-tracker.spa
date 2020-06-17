import {CalendarArrayModel} from './calendar-array.model';
import {CalendarMonth} from '../enums/calendar-month.enum';
import {CalendarDayEnum} from '../enums/calendar-day.enum';
import {BudgetDayModel} from './budget-day.model';

export class CalendarModel {
  public calendar: CalendarArrayModel[];
  // could be a bi-dimensional array but I think this is better
  public rowArray: Array<number>;
  public columnArray: Array<number>;
  private arrayCount = 42;
  // private rowCount = 6;
  // private columnCount = 7;

  constructor() {
    this.calendar = new Array<CalendarArrayModel>(this.arrayCount);
    // this.rowArray = Array.from(Array(this.rowCount).keys());
    // this.columnArray = Array.from(Array(this.columnCount).keys());
    this.initArrayObjects(this.arrayCount);
  }

  public calculateDaysNumberForArray(month: CalendarMonth, year: number) {
    const date = new Date(year, month, 1, 0, 0, 0);
    const firstDayOfMonth: CalendarDayEnum = date.getDay();
    // date: 0 means the last day for previous month
    const daysCount = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    // If selected is not equal to same month/year, set todayDate to -1 so nothing will be set to todaysDate
    const todayDate = today.getMonth() === month && today.getFullYear() === year ? today.getDate() : -1;
    this.setArray(firstDayOfMonth, daysCount, todayDate);
  }

  private initArrayObjects(length: number) {
    for (let i = 0; i < length; i++) {
      this.calendar[i] = {
        dayNumber: null,
        budgetForDay: null,
        isToday: false,
        clicked: false,
      };
    }
  }

  private setArray(firstDayOfMonth: CalendarDayEnum, daysInMonth: number, todayDate: number) {
    // First row goes from 0 to 6, should met Sunday-Sat enum
    // this.calendar[firstDayOfMonth].dayNumber = 1;
    this.initArrayObjects(this.arrayCount);
    let dayIndex: number = firstDayOfMonth;

    for (let i = 1; i <= daysInMonth; i++) {
      const day = i;
      this.calendar[dayIndex] = {
        dayNumber: day,
        budgetForDay: null,
        isToday: day === todayDate,
        clicked: false,
      };
      dayIndex++;
    }
    // Days after and before initialIndex should be null
  }
}
