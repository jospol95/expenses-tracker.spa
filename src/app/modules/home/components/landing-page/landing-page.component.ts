import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {HomePageViewModel} from '../../view-models/home-page-view.model';
import {BudgetDayModel} from '../../../calendar/models/budget-day.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FacadeModel} from '../../../../shared/models/facade.model';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {ChartDataModel} from '../../../../shared/models/chart-data.model';
import {CategoryBudgetExpenseViewModel} from '../../view-models/category-budget-expense-view.model';
import {CategoryModel} from '../../../../shared/models/category.model';
import {CalendarExpenseModel} from '../../../calendar/models/calendar-expense.model';
import {CalendarMonth} from '../../../calendar/enums/calendar-month.enum';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {CalendarIncomeModel} from '../../../calendar/models/calendar-income.model';
import {noop} from 'rxjs';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [DecimalPipe]
})

export class LandingPageComponent implements OnInit {

  public data: HomePageViewModel;
  public categoryBudgetExpenseList = new Array<CategoryBudgetExpenseViewModel>();
  public _filteredBudgetList: BudgetDayModel[] = new Array<BudgetDayModel>();
  // public totalIncome = 0;
  public totalExp = 0;
  public budgetDataChart: ChartDataModel[];
  public descriptionsArray = [];
  public descriptionSelected = '';
  public hasCategoriesAndAccounts = false;

  // for the quick search input
  public get filteredBudgetList(): BudgetDayModel[] {
    if (this.descriptionSelected) {
      this._filteredBudgetList = new Array<BudgetDayModel>();
      for (const day of this.budgetDays) {
        const filteredDay = {...day};
        filteredDay.expenses = day.expenses
          .filter((e) => e.title.includes(this.descriptionSelected));

        filteredDay.incomes = day.incomes.filter((inc) => inc.title.includes(this.descriptionSelected));
        this._filteredBudgetList.push(filteredDay);
      }
    } else {
      this._filteredBudgetList = [...this.budgetDays];
    }
    return this._filteredBudgetList;
  }

  public set filteredBudgetList(value) {
    this._filteredBudgetList = value;
  }

  public get budgetDays(): BudgetDayModel[] {
    return this.data.budgetDays;
  }

  public get categories(): CategoryModel[] {
    return this.data.categories;
  }

  public get accounts(): FacadeModel[] {
    return this.data.accounts;
  }

  public get expenses(): CalendarExpenseModel[] {
    let expenses = new Array<CalendarExpenseModel>();
    // expenses =
    this.budgetDays.forEach((day) =>
      expenses = expenses.concat(day.expenses));
    return expenses;
  }

  public get incomes(): CalendarIncomeModel[] {
    const incomes = new Array<CalendarIncomeModel>();
    this.budgetDays.forEach((d) => {
      d.incomes.forEach((i) => incomes.push(i));
    });
    return incomes;
  }


  // public set budgetDays(value) {
  //
  // }


  constructor(private readonly _route: ActivatedRoute,
              private readonly _router: Router
  ) {
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      // console.log(this.data);
      this.data = data.data;
      this.calculateAmounts();
      this.calculateTopData();
      this.buildStringOfDescriptions();
      // this.buildChartsData();
      this.buildExpenseForCategory();
      this.filteredBudgetList = [...this.budgetDays];
      this.hasCategoriesAndAccounts = (this.categories.length > 0 && this.accounts.length > 0);
      if (!this.hasCategoriesAndAccounts) {
        this.fireEmptyCategoriesAccountPrompt();
      }
    });
  }

  private fireEmptyCategoriesAccountPrompt() {
    swal.fire({
      title: 'Wait a second!',
      text: 'We noticed you don\'t have any accounts or categories. You can add those in the profile page, ' +
        'would you like to add them now?',
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Maybe later',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Add them now'
    }).then((result) => {
      if (result.value) {
        // add another was clicked
        this._router.navigate(['user/accounts']).then(() => noop());
      }
    });
  }


  public hasDayIncomeOrExpense(day: BudgetDayModel) {
    return day.expenses.length > 0 || day.incomes.length > 0;
  }

  public getAccountNameUpper(accountId: number): string {
    if (accountId == null || accountId === 0) {
      return '';
    }
    return this.accounts.find((a) => a.id === accountId).name.toUpperCase();
  }

  public getCategoryNameUpper(categoryId: number): string {
    if (categoryId == null || categoryId === 0) {
      return '';
    }
    return this.categories.find((c) => c.id === categoryId).name.toUpperCase();

  }

  public getCategoriesBudgetTotal() {
    let total = 0;
    this.categories.forEach((cat) => total += cat.budgetAssigned);
    return total;
  }

  public getMonthName(monthNum) {
    return CalendarMonth[monthNum - 1];
  }

  public filterBudgetList($event: any) {
    // console.log()
    // if ($event != null) {
    //   const expenses = this.budgetDays
    //     .filter((day) => day.expenses
    //       .forEach((e) => e.title === $event));
    //   const incomes = this.budgetDays
    //     .filter((day) => day.incomes
    //       .forEach((i) => i.title === $event));
    //   this.filteredBudgetList = expenses.concat(incomes);
    // } else {
    //   this.filteredBudgetList = [...this.budgetDays];
    // }

  }

  // public roundNumber(x: number): number{
  //   return Math.round(x);
  // }

  private calculateAmounts() {
    this.budgetDays.forEach((d) => {
      // d.incomes.forEach((i) => this.totalIncome += i.amount);
      d.expenses.forEach((e) => this.totalExp += e.amount);
    });
  }

  private buildStringOfDescriptions() {
    // builds the array<string> for quick-search
    this.descriptionsArray = [];
    this.budgetDays.forEach((d) => {
      d.incomes.forEach((i) => this.descriptionsArray.push(i.title));
      d.expenses.forEach((e) => this.descriptionsArray.push(e.title));
    });
    // this.descriptionsArray = {...descriptionsArray};
  }


  // private buildChartsData() {
  //   this.budgetDataChart = [];
  //   // const incomesTotal = this.totalIncome;
  //   // const expTotal = this.totalExp;
  //   this.budgetDataChart.push(
  //     {label: 'Income', value: this.totalIncome},
  //     {label: 'Expenses', value: this.totalExp});
  // }

  private calculateTopData() {
    //TODO: get from Backend
  }

  private buildExpenseForCategory() {
    this.categories.forEach((category) =>
      this.categoryBudgetExpenseList.push({
        category,
        totalExpenseForCategory: this.calculateTotalExpenseForCategory(category.id),
      }));
  }

  private calculateTotalExpenseForCategory(categoryId: number): number {
    let total = 0;
    // this.budgetDays.forEach((day) =>
    //   day.expenses.filter((expense) => expense.categoryId === categoryId)
    //     .forEach((categoryExpense) => total += categoryExpense.amount)
    // );
    this.expenses.filter((exp) => exp.categoryId === categoryId)
      .forEach((categoryExpense) => total += categoryExpense.amount);
    return total;
  }
}
