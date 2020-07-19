import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {CalendarService} from '../calendar/calendar.service';
import {HomePageResolver} from './resolvers/home-page.resolver';
import {MatIconModule} from '@angular/material/icon';
// import {IgxProgressBarModule} from 'igniteui-angular';



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  providers: [
    CalendarService
  ]
})
export class HomeModule { }
