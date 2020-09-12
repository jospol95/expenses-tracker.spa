import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarMonth} from '../../enums/calendar-month.enum';
import {$e} from 'codelyzer/angular/styles/chars';
import {noop} from 'rxjs';
import {CalendarService} from '../../calendar.service';
import {BudgetDayModel} from '../../models/budget-day.model';
import {CalendarEditEntryModalComponent} from '../modals/calendar-edit-entry-modal/calendar-edit-entry-modal.component';
import {CalendarIncomeModel} from '../../models/calendar-income.model';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {CalendarExpenseModel} from '../../models/calendar-expense.model';
import {EditExpenseDialogData} from '../../interfaces/edit-expense-dialog-data';
import {CalendarEditExpenseModalComponent} from '../modals/calendar-edit-expense-modal/calendar-edit-expense-modal.component';
import {CalendarPageViewModel} from '../../view-models/calendar-page-view.model';
import {EditEntryModalData} from '../../interfaces/dialog-data';
import {CalendarArrayModel} from '../../models/calendar-array.model';
import {CalendarModel} from '../../models/calendar.model';
import {CalendarDateModel} from '../../models/calendar-date.model';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {
  public pageData = new CalendarPageViewModel();
  // Month, Day, Year
  public dateModel: CalendarDateModel = new CalendarDateModel();
  public budgetDays = new Array<BudgetDayModel>();
  public budgetDaySelected: BudgetDayModel;
  public calendarLineal = new CalendarModel();
  public calendar: Array<Array<CalendarArrayModel>> = new Array<Array<CalendarArrayModel>>();
  public calendarDaySelected: number;

  constructor(public dialog: MatDialog,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly service: CalendarService) {
  }

// TODO: SET CLICKED DEFAULT TO TODAYS DATE, CHECK LOWER COMPO
  ngOnInit() {
    this.route.data.subscribe((pageData) => {
      // console.log(pageData);
      this.pageData = pageData.data;
      this.budgetDays = [...this.pageData.budgetDays];
      this.setClickedToToday();
    });

    const currentMonthAndYear: [CalendarMonth, number] = this.getCurrentMonthAndDate();
    this.dateModel.month = currentMonthAndYear[0];
    this.dateModel.year = currentMonthAndYear[1];
    // this.calculateCalendar(this.dateModel.month, this.dateModel.year);
    // this.setClickedToToday();

    // this.budgetDaySelected = this.budgetDays[index];
    // this.getBudgetDays();
  }

  public getBudgetDays() {
    const currentDate = new Date();
    const currentMonth: CalendarMonth = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();
    this.service.getBudgetDays(currentMonth, currentYear, 123).subscribe(
      (response) => {
        this.budgetDays = response;
      }
    );

  }

  public addNewEventHandler($event) {
    this.router.navigate(
      ['calendar/new'],
      {queryParams: {month: this.dateModel.month, day: this.dateModel.day, year: this.dateModel.year}}
    ).then((r) => noop());
  }

  public selectedDateChangeEventHandler($event: [CalendarMonth, number, number]) {
    // month,year changed
    this.dateModel.month = $event[0];
    this.dateModel.day = $event[1];
    this.dateModel.year = $event[2];

    // todo clear clicked day on date change
    // this.budgetDaySelected = null;

    // get budgetDays
    this.service.getBudgetDays(this.dateModel.month, this.dateModel.year, 123).subscribe(
      (response) => {
        this.budgetDays = [...response];

      }
    );
    // const index = this.budgetDays.findIndex((d) => d.day === $event[1]);
    // this.budgetDaySelected = this.budgetDays[index];
  }

  public selectedMonthOrYearChangedEvent($event) {

  }

  public clickedDayEventHandler($event: number) {
    const index = this.budgetDays.findIndex((d) => d.day === $event);
    this.dateModel.day = $event;
    this.budgetDaySelected = this.budgetDays[index];
  }

  public deleteExpenseClickedEventHandler($event: string) {
    const id = $event;
    swal.fire({
      title: 'We\'re getting rid of this one !',
      text: 'Are you sure that you want to delete this record?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#FF0000',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.value) {
        // delete
        this.service.deleteExpense(id).subscribe(() => {
          this.deleteExpenseFromArray(id);
          swal.close();
        });
      } else {
        // no clicked
        swal.close();
      }
    });
  }

  public deleteIncomeClickedEventHandler($event: string) {
    const id = $event;
    swal.fire({
      title: 'We\'re getting rid of this one !',
      text: 'Are you sure that you want to delete this record?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#FF0000',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.value) {
        // delete
        this.service.deleteIncome(id).subscribe(() => {
          this.deleteIncomeFromArray(id);
          swal.close();
        });
      } else {
        // no clicked
        swal.close();
      }
    });
  }

  public expenseDetailClickedEventHandler($event: string) {
    const sharedModalData: EditExpenseDialogData = {
      id: $event,
      expenseChanged: null,
      categories: this.pageData.categories,
      accounts: this.pageData.accounts
    };
    const dialogRef = this.dialog.open(CalendarEditExpenseModalComponent, {
      width: '400px',
      data: sharedModalData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (sharedModalData.expenseChanged != null) {
        // income record was changed, needs to look for the item with that record and replace
        const expenseChanged = {...sharedModalData.expenseChanged};
        this.replaceExpense(expenseChanged);
      }
    });
  }

  public incomeDetailClickedEventHandler($event: string) {
    const sharedModalData: EditEntryModalData = {
      id: $event,
      incomeChanged: null,
      accounts: this.pageData.accounts
    };
    const dialogRef = this.dialog.open(CalendarEditEntryModalComponent, {
      width: '400px',
      data: sharedModalData
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (sharedModalData.incomeChanged != null) {
        // income record was changed, needs to look for the item with that record and replace
        const incomeChanged = {...sharedModalData.incomeChanged};
        this.replaceIncome(incomeChanged);
      }
    });
  }

  private replaceIncome(incomeToReplace: CalendarIncomeModel) {
    for (let i = 0; i < this.budgetDays.length; i++) {
      const incomeList = this.budgetDays[i].incomes;
      const incomeModelIndex = incomeList.findIndex((income) => income.id === incomeToReplace.id);
      if (incomeModelIndex !== -1) {
        this.budgetDays[i].incomes[incomeModelIndex] = incomeToReplace;
        i = this.budgetDays.length;
      }
    }
  }

  private replaceExpense(expenseToReplace: CalendarExpenseModel) {
    for (let i = 0; i < this.budgetDays.length; i++) {
      const expenseList = this.budgetDays[i].expenses;
      const expenseModelIndex = expenseList.findIndex((expense) => expense.id === expenseToReplace.id);
      if (expenseModelIndex !== -1) {
        this.budgetDays[i].expenses[expenseModelIndex] = expenseToReplace;
        i = this.budgetDays.length;
      }
    }
  }

  private deleteIncomeFromArray(id: string) {
    for (let i = 0; i < this.budgetDays.length; i++) {
      const incomeList = this.budgetDays[i].incomes;
      const incomeModelIndex = incomeList.findIndex((income) => income.id === id);
      if (incomeModelIndex !== -1) {
        this.budgetDays[i].incomes.splice(incomeModelIndex, 1);
        i = this.budgetDays.length;
      }
    }
  }

  private deleteExpenseFromArray(id: string) {
    for (let i = 0; i < this.budgetDays.length; i++) {
      const expenseList = this.budgetDays[i].expenses;
      const expenseModelIndex = expenseList.findIndex((expense) => expense.id === id);
      if (expenseModelIndex !== -1) {
        this.budgetDays[i].expenses.splice(expenseModelIndex, 1);
        i = this.budgetDays.length;
      }
    }
  }

  private getCurrentMonthAndDate(): [CalendarMonth, number] {
    const currentDate = new Date();
    const currentMonth: CalendarMonth = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();
    return [currentMonth, currentYear];
  }

  //
  // private mapBudgetDaysToCalendar() {
  //   if (this.budgetDays != null) {
  //     this.budgetDays.forEach((budgetDay) => {
  //       const dayNumber = budgetDay.day;
  //       const index = this.calendarLineal.calendar
  //         .findIndex((c) => c.dayNumber === dayNumber);
  //       this.calendarLineal.calendar[index].budgetForDay = budgetDay;
  //     });
  //   }
  // }

  // private calculateCalendar(selectedMonth: CalendarMonth, selectedYear: number) {
  //   this.calendarLineal.calculateDaysNumberForArray(selectedMonth, selectedYear);
  //   // maps budgetDays -> calendarLineal
  //   this.mapBudgetDaysToCalendar();
  //   // creates bidimensional array
  //   this.calendarToBidimensional();
  // }

  // private calendarToBidimensional() {
  //   const rows = 6;
  //   const columns = 7;
  //   const calendar = new Array<Array<CalendarArrayModel>>();
  //   let arrayCount = 0;
  //
  //   for (let i = 0; i < rows; i++) {
  //     const row = new Array<any>();
  //     for (let j = 0; j < columns; j++) {
  //       // row[i][j] = this.model.calendar[arrayCount];
  //       row.push(this.calendarLineal.calendar[arrayCount]);
  //       arrayCount++;
  //     }
  //     calendar.push(row);
  //   }
  //   this.calendar = {...calendar};
  //   // console.log(this.calendar);
  // }

  private setClickedToToday() {
    // let row = 0;
    // let column = 0;
    // // const active = this.model[1]
    // //   .find((day) => day.isToday === false);
    // for (let i = 0; i < 6; i++) {
    //   for (let j = 0; j < 7; j++) {
    //     // row[i][j] = this.model.calendar[arrayCount];
    //     if (this.calendar[i][j].isToday === true) {
    //       row = i;
    //       column = j;
    //     }
    //   }
    // }
    // this.calendar[row][column].clicked = true;
    // this.dateModel.day =  this.calendar[row][column].dayNumber;
    // this.calendarDaySelected = this.calendar[row][column].dayNumber;

    const currentDate = new Date();
    const budgetYear = this.budgetDays[0].year;
    const budgetMonth = this.budgetDays[0].month - 1;
    console.log(budgetYear, budgetMonth);
    if (currentDate.getFullYear() === budgetYear && currentDate.getMonth() === budgetMonth) {
      // set clicked to currentDay
      const index = this.budgetDays.findIndex((d) => d.day === currentDate.getDate());
      this.budgetDaySelected = {...this.budgetDays[index]};
      this.dateModel.day = currentDate.getDate();
      this.calendarDaySelected = currentDate.getDate();
    } else {
      // set clicked to 1st date of selected month
      // TODO: fix CSS for clicked
      this.budgetDaySelected = {...this.budgetDays[0]};;
      this.dateModel.day = 1;
      this.calendarDaySelected = 1;
    }
  }
}
