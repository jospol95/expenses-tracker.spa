import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

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

  constructor() {
  }

  ngOnInit() {
  }

}
