import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts-page',
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.scss']
})
export class ChartsPageComponent implements OnInit {

  public daysArray = [
    {day: 1, hasRegister: true},
    {day: 2, hasRegister: false},
    {day: 3, hasRegister: true},
    {day: 4, hasRegister: false},
    {day: 5, hasRegister: true},
    {day: 6, hasRegister: true},
    {day: 7, hasRegister: true},
    {day: 8, hasRegister: false},
  ];

  constructor() { }

  ngOnInit() {
  }

}
