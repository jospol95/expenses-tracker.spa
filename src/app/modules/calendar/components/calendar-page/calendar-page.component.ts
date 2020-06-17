import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarMonth} from '../../enums/calendar-month.enum';
import {$e} from 'codelyzer/angular/styles/chars';
import {noop} from 'rxjs';
import {CalendarService} from '../../calendar.service';
import {BudgetDayModel} from '../../models/budget-day.model';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {
  public dateArray: [CalendarMonth, number, number];
  public budgetDays = new Array<BudgetDayModel>();
  public budgetDaySelected: BudgetDayModel;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly service: CalendarService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.budgetDays = data.data;
    });
    const currentDate = new Date();
    const index = this.budgetDays.findIndex((d) => d.day === currentDate.getDate());
    this.budgetDaySelected = this.budgetDays[index];
    this.budgetDaySelected = this.budgetDays[index];
    // this.getBudgetDays();
  }

  public getBudgetDays() {
    const currentDate = new Date();
    const currentMonth: CalendarMonth = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();
    this.service.getBudgetDays(currentMonth , currentMonth, 123).subscribe(
      (response) => {
        this.budgetDays = response;
      }
    );

  }

  public addNewEventHandler($event) {
    this.router.navigate(
      ['calendar/new'],
      {queryParams: {month: this.dateArray[0], day: this.dateArray[1], year: this.dateArray[2]}}
    ).then((r) => noop());
  }

  public selectedDateChangeEventHandler($event: [CalendarMonth, number, number]) {
    // only for month,year changed
    this.dateArray = $event;
    // const index = this.budgetDays.findIndex((d) => d.day === $event[1]);
    // this.budgetDaySelected = this.budgetDays[index];
  }

  public selectedMonthOrYearChangedEvent($event) {

  }

  public clickedDayEventHandler($event: number) {
    const index = this.budgetDays.findIndex((d) => d.day === $event );
    this.dateArray[1] = $event;
    this.budgetDaySelected = this.budgetDays[index];
  }
}
