import { Component, OnInit } from '@angular/core';
import {UserModuleRoutes} from '../../user-module.routes';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  public tabRoutes = UserModuleRoutes.routes;
  constructor() { }

  ngOnInit() {
  }

}
