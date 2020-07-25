import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {CalendarService} from '../calendar/calendar.service';
import {HomePageResolver} from './resolvers/home-page.resolver';
import {MatIconModule} from '@angular/material/icon';
import {IgxAutocompleteModule, IgxDropDownModule, IgxInputGroupModule, IgxProgressBarModule} from 'igniteui-angular';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    MatIconModule,
    IgxProgressBarModule,
    IgxAutocompleteModule,
    IgxDropDownModule,
    IgxInputGroupModule,
    FormsModule,
  ],
  providers: [
    CalendarService
  ]
})
export class HomeModule {
}
