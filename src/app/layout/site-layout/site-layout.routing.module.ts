import {RouterModule, Routes} from '@angular/router';
import {SiteLayoutComponent} from './site-layout.component';
import {NgModule} from '@angular/core';
import {CalendarPageComponent} from '../../modules/calendar/components/calendar-page/calendar-page.component';

const routes: Routes = [
  {path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
  },
  {path: 'calendar',
    component: CalendarPageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SiteLayoutRoutingModule { }
