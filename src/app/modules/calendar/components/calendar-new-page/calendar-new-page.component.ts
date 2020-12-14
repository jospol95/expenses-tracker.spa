import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarIncomeModel} from '../../models/calendar-income.model';
import {CalendarExpenseModel} from '../../models/calendar-expense.model';
import {CalendarService} from '../../calendar.service';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {CalendarNewPageViewModel} from '../../view-models/calendar-new-page-view.model';
import {Subject} from 'rxjs';
import {ServiceInjector} from '../../../../shared/services/service-injector.service';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import {CalendarBudgetEntryModel} from '../../models/calendar-budget-entry.model';
import {CalendarBudgetEntryType} from '../../enums/calendar-budget-entry.enum';


@Component({
  selector: 'app-calendar-new-page',
  templateUrl: './calendar-new-page.component.html',
  styleUrls: ['./calendar-new-page.component.scss']
})
export class CalendarNewPageComponent extends ServiceInjector implements OnInit {

  // public newExpense = new CalendarExpenseModel();
  // public newIncome = new CalendarIncomeModel();
  public model = new CalendarBudgetEntryModel();
  public pageData: CalendarNewPageViewModel = new CalendarNewPageViewModel();
  public dateSelected = new FormControl('');

  constructor(private readonly _route: ActivatedRoute,
              private readonly _router: Router,
              private readonly injector: Injector,
              private readonly _service: CalendarService) {
    super(injector);
  }

  public ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      if (params) {
        if (params.day && params.month && params.year) {
          // TODO: Validate params
          this.buildDateFromQueryParams(params.day, params.month, params.year);
          this._route.data.subscribe((pageData) => {
            this.pageData = pageData.data;
          });
        }
      } else {
        // else redirect to 404
        console.log('404');
      }
    });
  }

  private buildDateFromQueryParams(dayParam: string, monthParam: string, yearParam: string) {
    const day = parseInt(dayParam, 10);
    const month = parseInt(monthParam, 10);
    const year = parseInt(yearParam, 10);
    this.dateSelected = new FormControl(new Date(year, month, day));
  }


  public saveCalendarBudgetingEntry($event: [CalendarBudgetEntryModel, CalendarBudgetEntryType]) {
    // this.handleBadResponse();
    const [entry, type] = $event;
    entry.date = this.dateSelected.value;
    entry.userId = this._authService.getUserId();

    switch (type) {
      case CalendarBudgetEntryType.Income :
        this.addIncome(entry);
        break;
      case CalendarBudgetEntryType.Expense :
        this.addExpense(entry);
        break;
    }
  }

  private addIncome(income: any) {
    this._service.addIncome(income).subscribe((id) => {
        if (id) {
          this.handleGoodResponse();
        }
      }, (error) => {
        this.handleBadResponse();
      }
    );
  }

  private addExpense(expense: any) {
    this._service.addExpense(expense).subscribe((id) => {
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
        // add another was clicked
        this.model = new CalendarBudgetEntryModel();
        const date: Date = this.dateSelected.value;
        this._router.navigate(
          ['calendar/new'],
          {queryParams: {month: date.getMonth(), day: date.getDate() , year: date.getFullYear()}}
        );
      } else {
        // not now was clicked
        this._router.navigate(
          ['calendar']
        );
      }
    });

  }
}
