
// should simulate a fixed calendar array, should have 6 rows by 7 columns each. -> 42 (in order to cover all the days)
import {BudgetDayModel} from './budget-day.model';
import {CalendarMonth} from '../enums/calendar-month.enum';
import {CalendarDayEnum} from '../enums/calendar-day.enum';

export class CalendarArrayModel {
  // array total will always be 42. so arrayPosition will have values from 0 - 41;
  // First row will be 1-7 (0-6 index)
  // if first day of month = Wednesday eg., since Sunday is always first (row 1,1)
  // dayNumber is gonna start to increment from one in row 1,4 until end of the month. Everything else should be null
  public dayNumber: number | null;
  public isToday: boolean;
  public clicked: boolean;
  public budgetForDay: BudgetDayModel | null;

  // constructor() {
  //   const arrayTotal = 42;
  //   for (let i = 0; i < arrayTotal; i++) {
  //     this.arrayPosition = i;
  //   }
  // }
  //
  // public calculateDaysNumberForArray(month: CalendarMonth, year: number) {
  //   const date = new Date(year, month, 1, 0, 0, 0);
  //   const firstDayOfMonth = CalendarDayEnum[date.getDay()];
  //   // date: 0 means the last day for previous month
  //   const dayCount = new Date(year, month + 1, 0).getDay();
  // }
  //
  // private setArray(firstDayOfMonth: CalendarDayEnum, daysInMonth: number) {
  //   // First row goes from 0 to 6, should met Sunday-Sat enum
  //
  // }

}


