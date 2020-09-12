import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {HomePageViewModel} from '../../view-models/home-page-view.model';
import {BudgetDayModel} from '../../../calendar/models/budget-day.model';
import {ActivatedRoute} from '@angular/router';
import {FacadeModel} from '../../../../shared/models/facade.model';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {AutocompletePipeStartsWith} from '../../../../shared/pipes/auto-complete-pipe';
import {ChartDataModel} from '../../../../shared/models/chart-data.model';
import {filter} from 'rxjs/operators';
import {CategoryBudgetExpenseViewModel} from '../../view-models/category-budget-expense-view.model';
import {CategoryModel} from '../../../../shared/models/category.model';
import {CalendarExpenseModel} from '../../../calendar/models/calendar-expense.model';
import {Extractor} from '@angular/compiler';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [DecimalPipe]
})

export class LandingPageComponent implements OnInit {

  public data: HomePageViewModel;
  public categoryBudgetExpenseList = new Array<CategoryBudgetExpenseViewModel>();
  // public __budgetDays: BudgetDayModel[];
  // public __categories: CategoryModel[];
  // public __accounts: FacadeModel[];
  public _filteredBudgetList: BudgetDayModel[] = new Array<BudgetDayModel>();
  public totalIncome = 0;
  public totalExp = 0;
  public budgetDataChart: ChartDataModel[];
  public descriptionsArray = [];
  public descriptionSelected = '';
  // public topIncomes = new Array<BudgetDayModel>(3);
  // public topExp = new Array<BudgetDayModel>(3);
  //
  // public daysArray = [
  //   {day: 1, hasRegister: true, register: 'Gas station', money: 43, category: 'Transportation', account: 'Chase Debit', income: false},
  //   {day: 2, hasRegister: true, register: 'Headphones XM1', money: 50, category: 'Entertainment', account: 'Chase Debit', income: false},
  //   {day: 3, hasRegister: true, register: 'Paycheck', money: 2500, account: 'Chase Debit', income: true},
  //   {day: 8, hasRegister: false, register: 'Whole Foods', category: 'Food', account: 'Chase Freedom', income: false},
  //   {day: 5, hasRegister: false},
  //   {day: 6, hasRegister: true},
  //   {day: 7, hasRegister: false},
  //   {day: 8, hasRegister: false},
  // ];

  public get filteredBudgetList(): BudgetDayModel[] {
    // this._filteredBudgetList =
    if (this.descriptionSelected) {
      this._filteredBudgetList = new Array<BudgetDayModel>();
      for (const day of this.budgetDays) {
        // const day = ;
        const filteredDay = {...day};
        filteredDay.expenses = day.expenses
          .filter((e) => e.title.includes(this.descriptionSelected));

        filteredDay.incomes = day.incomes.filter((inc) => inc.title.includes(this.descriptionSelected));
        this._filteredBudgetList.push(filteredDay);
      }
    } else {
      // console.table(this.budgetDays);
      this._filteredBudgetList = [...this.budgetDays];
    }
    return this._filteredBudgetList;
  }

  public set filteredBudgetList(value) {
    this._filteredBudgetList = value;
  }

  public get budgetDays(): BudgetDayModel[] {
    // this.__budgetDays = this.data.budgetDays;
    // return this.__budgetDays;
    return this.data.budgetDays;
  }

  public get categories(): CategoryModel[] {
    // this.__categories = this.data.categories;
    // return this.__categories;
    return this.data.categories;
  }

  public get expenses(): CalendarExpenseModel[] {
    let expenses = new Array<CalendarExpenseModel>();
    // expenses =
    this.budgetDays.forEach((day) =>
      expenses = expenses.concat(day.expenses));
    return expenses;
  }

  public get accounts(): FacadeModel[] {
    // this.__accounts = this.data.accounts;
    // return this.__accounts;
    return this.data.accounts;
  }

  // public set budgetDays(value) {
  //
  // }



  constructor(private readonly _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      // console.log(this.data);
      this.data = data.data;
      this.calculateAmounts();
      this.calculateTopData();
      this.buildStringOfDescriptions();
      this.buildChartsData();
      this.buildExpenseForCategory();
      this.filteredBudgetList = [...this.budgetDays];
      console.table(this.expenses);
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
      d.incomes.forEach((i) => this.totalIncome += i.amount);
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


  private buildChartsData() {
    this.budgetDataChart = [];
    // const incomesTotal = this.totalIncome;
    // const expTotal = this.totalExp;
    this.budgetDataChart.push(
      {label: 'Income', value: this.totalIncome},
      {label: 'Expenses', value: this.totalExp});
  }

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
