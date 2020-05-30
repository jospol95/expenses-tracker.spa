import { Component, OnInit } from '@angular/core';
import {SiteLayoutRoutingModule} from '../../../layout/site-layout/site-layout.routing.module';
import {SiteLayoutRoutes} from '../../../layout/site-layout/site-layout.routes';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  public siteRoutes = SiteLayoutRoutes.routes;
  public optionsMenu: any[];
  constructor() {
  }

  ngOnInit() {

  }

}
