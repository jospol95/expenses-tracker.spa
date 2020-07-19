import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CalendarPageComponent} from './components/calendar-page/calendar-page.component';
import {CalendarNewPageComponent} from './components/calendar-new-page/calendar-new-page.component';
import {CalendarComponentsModule} from './components/calendar-components.module';
import {CalendarResolver} from './resolvers/calendar.resolver';
import {CalendarNewPageResolver} from './resolvers/calendar-new-page.resolver';

const routes: Routes = [
  // {path: '',
  //   redirectTo: 'calendar',
  //   pathMatch: 'full'
  // },
  {path: 'calendar',
    component: CalendarPageComponent,
    resolve: {data: CalendarResolver}
  },
  {path: 'calendar/new',
    component: CalendarNewPageComponent,
    resolve: {data: CalendarNewPageResolver}
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CalendarComponentsModule,
    CommonModule
  ],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
