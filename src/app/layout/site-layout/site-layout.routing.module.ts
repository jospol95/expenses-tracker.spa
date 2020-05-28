import {RouterModule, Routes} from '@angular/router';
import {SiteLayoutComponent} from './site-layout.component';
import {NgModule} from '@angular/core';
import {CalendarPageComponent} from '../../modules/calendar/components/calendar-page/calendar-page.component';
// import {UserPageComponent} from '../../modules/user/components/user-page/user-page.component';
// import * from '../../modules/user/components/user-components.module'
import {UserComponentsModule} from '../../modules/user/components/user-components.module';
import {UserPageComponent} from '../../modules/user/components/user-page/user-page.component';

const routes: Routes = [
  {path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
  },
  {path: 'calendar',
    component: CalendarPageComponent,
  },
  {path: 'login',
    component: UserPageComponent,
  },
  {path: 'user-profile/login',
    component: UserPageComponent
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UserComponentsModule
  ],
  exports: [RouterModule]
})

export class SiteLayoutRoutingModule { }
