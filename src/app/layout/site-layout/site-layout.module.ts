import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiteLayoutComponent} from './site-layout.component';
import {CalendarPageComponent} from '../../modules/calendar/components/calendar-page/calendar-page.component';
import {SiteLayoutRoutingModule} from './site-layout.routing.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatSelectModule} from '@angular/material';
import {CalendarContainerComponent} from '../../modules/calendar/components/calendar-page/calendar-container/calendar-container.component';
import {CalendarNumberComponent} from '../../modules/calendar/components/calendar-page/calendar-number/calendar-number.component';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';


@NgModule({
  declarations: [
    SiteLayoutComponent,
  ],
  imports: [
    SiteLayoutRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    SharedComponentsModule
  ]
})
export class SiteLayoutModule { }
