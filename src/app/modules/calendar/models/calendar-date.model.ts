import {CalendarMonth} from '../enums/calendar-month.enum';

export class CalendarDateModel {
  // starts with 0 - January
  public month: CalendarMonth;
  public day: number;
  public year: number;
}
