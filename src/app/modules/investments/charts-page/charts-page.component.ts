import {Component, OnInit} from '@angular/core';
import {ReportTypeEnum} from '../enums/report-type.enum';

@Component({
  selector: 'app-charts-page',
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.scss']
})
export class ChartsPageComponent implements OnInit {


  fabButtons = [
    {
      icon: 'picture_as_pdf',
      class: 'pdf-fab'
    },
    {
      icon: 'description',
      class: 'excel-fab'
    },
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }
  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  public reportType: ReportTypeEnum;
  public startDateReport: Date;
  public endDateReport: Date;

  public daysArray = [
    {day: 1, opt: 'Show all'},
    {day: 2, opt: 'Break by category'},
    {day: 3, opt: 'Break by account'},
    // {day: 4, hasRegister: false},
    // {day: 5, hasRegister: true},
    // {day: 6, hasRegister: true},
    // {day: 7, hasRegister: true},
    // {day: 8, hasRegister: false},
  ];

  constructor() { }

  ngOnInit() {
    this.initializeDatePickers();
    this.reportType = ReportTypeEnum.showAll;
  }
  // initialize date pickers to firstDateOfMonth - currentDate
  private initializeDatePickers(){
    const dt = new Date();
    this.startDateReport = new Date(dt.getFullYear(), dt.getMonth(), 1);
    this.endDateReport = dt;
  }

}
