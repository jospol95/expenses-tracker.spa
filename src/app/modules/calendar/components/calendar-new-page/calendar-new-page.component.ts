import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarIncomeModel} from '../../models/calendar-income.model';
import {CalendarExpenseModel} from '../../models/calendar-expense.model';
import {CalendarService} from '../../calendar.service';
import {BasePageComponent} from '../../../../shared/components/base-page/base-page.component';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {CalendarNewPageViewModel} from '../../view-models/calendar-new-page-view.model';


@Component({
  selector: 'app-calendar-new-page',
  templateUrl: './calendar-new-page.component.html',
  styleUrls: ['./calendar-new-page.component.scss']
})
export class CalendarNewPageComponent extends BasePageComponent implements OnInit {
  public day: number;
  public month: number;
  public year: number;

  private _monthName: string;

  public pageData: CalendarNewPageViewModel = new CalendarNewPageViewModel();

  constructor(private readonly __route: ActivatedRoute, private readonly __router: Router, private readonly __service: CalendarService) {
    super();
  }

  get monthName(): string {
    switch (this.month) {
      case 0:
        this._monthName = 'January';
        break;
      case 1:
        this._monthName = 'February';
        break;
      case 2:
        this._monthName = 'March';
        break;
      case 3:
        this._monthName = 'April';
        break;
      case 4:
        this._monthName = 'May';
        break;
      case 5:
        this._monthName = 'June';
        break;
      case 6:
        this._monthName = 'July';
        break;
      case 7:
        this._monthName = 'August';
        break;
      case 8:
        this._monthName = 'September';
        break;
      case 9:
        this._monthName = 'October';
        break;
      case 10:
        this._monthName = 'November';
        break;
      case 11:
        this._monthName = 'December';
        break;
      default:
        this._monthName = '';
        break;
    }

    return this._monthName;
  }

  public ngOnInit() {
    this.__route.queryParams.subscribe((params) => {
      if (params) {
        if (params.day && params.month && params.year) {
          // check if valid date
          this.day = parseInt(params.day, 10);
          this.month = parseInt(params.month, 10);
          this.year = parseInt(params.year, 10);

          this.__route.data.subscribe((pageData) => {
            console.log(pageData);
            this.pageData = pageData.data;
          });
        }
      } else {
        // else redirect to 404
        console.log('404');
      }

    });
  }

  public saveIncomeEventHandler($event: CalendarIncomeModel) {
    // this.handleBadResponse();
    const income = $event;
    income.date = new Date(this.year, this.month, this.day);
    income.userId = '123';
    this.__service.addIncome(income).subscribe((id) => {
        if (id) {
          this.handleGoodResponse();
        }
      }, (error) => {
        this.handleBadResponse();
      }
    );
  }

  public saveExpenseEventHandler($event: CalendarExpenseModel) {
    const expense = $event;
    expense.date = new Date(this.year, this.month, this.day);
    expense.userId = '123';

    this.__service.addExpense(expense).subscribe((id) => {
        if (id) {
          this.handleGoodResponse();
        }
      }, (error) => {
        this.handleBadResponse();
      }
    );
  }

  private handleBadResponse() {
    swal.fire({
      title: 'An error occurred',
      text: 'Please try again',
      icon: 'error',
    });
  }

  private handleGoodResponse() {
    swal.fire({
      title: 'Added',
      text: 'Would you like to add another record?',
      icon: 'success',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Not now',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Add another'
    }).then((result) => {
      if (result.value) {
        // add another clicked
        this.__router.navigate(
          ['calendar/new'],
          {queryParams: {day: this.day, month: this.month, year: this.year}}
        );
      } else {
        // not now clicked
        this.__router.navigate(
          ['calendar']
        );
      }
    });

  }

  public getDayArrayForDate() {
    // date: 0 means the last day for previous month
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    const optionDayArray = [];
    const dateSelected = this.day;
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOption = {
        value: i,
        isSelected: i === dateSelected,
        title: i
      };
      optionDayArray.push(dayOption);
    }
    return optionDayArray;
  }
}
