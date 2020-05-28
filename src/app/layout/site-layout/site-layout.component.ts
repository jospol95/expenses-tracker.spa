import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})


export class SiteLayoutComponent implements OnInit {
  public foods;
  public years;
  public test: any ;
  constructor() {
    this.foods = [
      {value: 'steak-0', viewValue: 'January'},
      {value: 'pizza-1', viewValue: 'February'},
      {value: 'tacos-2', viewValue: 'May'}
    ];
    this.years = [
      {value: 'steak-0', viewValue: '2018'},
      {value: 'pizza-1', viewValue: '2019'},
      {value: 'tacos-2', viewValue: '2020'},
      {value: 'tacos-2', viewValue: '2021'}
    ];
  }

  ngOnInit() {
  }

}
