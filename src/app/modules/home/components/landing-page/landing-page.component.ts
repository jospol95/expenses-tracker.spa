import {Component, OnInit} from '@angular/core';
import {HomePageViewModel} from '../../view-models/home-page-view.model';
import {BudgetDayModel} from '../../../calendar/models/budget-day.model';
import {ActivatedRoute} from '@angular/router';
import {FacadeModel} from '../../../../shared/facade.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public data: HomePageViewModel;
  public __budgetDays: BudgetDayModel[];
  public __categories: FacadeModel[];
  public __accounts: FacadeModel[];

  public daysArray = [
    {day: 1, hasRegister: true, register: 'Gas station', money: 43, category: 'Transportation', account: 'Chase Debit', income: false},
    {day: 2, hasRegister: true, register: 'Headphones XM1', money: 50, category: 'Entertainment', account: 'Chase Debit', income: false},
    {day: 3, hasRegister: true, register: 'Paycheck', money: 2500, account: 'Chase Debit', income: true},
    {day: 8, hasRegister: false, register: 'Whole Foods', category: 'Food', account: 'Chase Freedom', income: false},
    {day: 5, hasRegister: false},
    {day: 6, hasRegister: true},
    {day: 7, hasRegister: false},
    {day: 8, hasRegister: false},
  ];

  public get budgetDays(): BudgetDayModel[] {
    this.__budgetDays = this.data.budgetDays;
    return this.__budgetDays;
  }

  public get categories(): FacadeModel[] {
    this.__categories = this.data.categories;
    return this.__categories;
  }

  public get accounts(): FacadeModel[] {
    this.__accounts = this.data.accounts;
    return this.__accounts;
  }

  // public set budgetDays(value) {
  //
  // }

  constructor(private readonly _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.data = data.data;
      console.log(this.data);
    });
  }

  public hasDayIncomeOrExpense(day: BudgetDayModel) {
    return day.expenses.length > 1 || day.incomes.length > 1;
  }

  public getAccountNameUpper(accountId: number): string {
    if (accountId == null || accountId === 0) return '';
    return this.accounts.find((a) => a.id === accountId).name.toUpperCase();
  }

  public getCategoryNameUpper(categoryId: number): string {
    if (categoryId == null || categoryId === 0) return '';
    return this.categories.find((c) => c.id === categoryId).name.toUpperCase();

  }

}
