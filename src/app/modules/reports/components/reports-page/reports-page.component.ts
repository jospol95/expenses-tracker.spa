import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {
  public data;
  constructor() {
    this.data = [
      { Label: "Administration", Value: 2 },
      { Label: "Income", Value: 8 },
      { Label: "IT", Value: 3 },
      { Label: "Marketing", Value: 8 },
      { Label: "Development", Value: 4 },
      { Label: "Customer Support", Value: 6 }
    ];
  }

  ngOnInit() {

  }

}
