import {RouterModule, Routes} from '@angular/router';
import {SiteLayoutComponent} from './site-layout.component';
import {NgModule} from '@angular/core';
import {CalendarPageComponent} from '../../modules/calendar/components/calendar-page/calendar-page.component';
// import {UserPageComponent} from '../../modules/user/components/user-page/user-page.component';
// import * from '../../modules/user/components/user-components.module'
import {UserComponentsModule} from '../../modules/user/components/user-components.module';
import {UserPageComponent} from '../../modules/user/components/user-page/user-page.component';
import {ReportsPageComponent} from '../../modules/reports/components/reports-page/reports-page.component';
import {ReportsComponentsModule} from '../../modules/reports/components/reports-components.module';
import {LandingPageComponent} from '../../modules/landing/components/landing-page/landing-page.component';
import {LandingComponentsModule} from '../../modules/landing/components/landing-components.module';
import {CalendarLayoutComponent} from '../../modules/calendar/components/calendar-layout/calendar-layout.component';
import {CalendarModule} from '../../modules/calendar/calendar.module';
import {CalendarComponentsModule} from '../../modules/calendar/components/calendar-components.module';

const routes: Routes = [
  {path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
  },
  // {path: 'calendar',
  //   component: CalendarPageComponent,
  // },
  {path: 'calendar',
    component: CalendarLayoutComponent,
    loadChildren: () => import('./../../modules/calendar/calendar.module')
    .then(m => m.CalendarModule)
  },
  {path: 'login',
    component: UserPageComponent,
  },
  {path: 'user-profile/login',
    component: UserPageComponent
  },
  {path: 'reports',
    component: ReportsPageComponent
  },
  {path: 'home',
    component: LandingPageComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UserComponentsModule,
    ReportsComponentsModule,
    LandingComponentsModule,
    CalendarModule,
  ],
  exports: [RouterModule]
})

export class SiteLayoutRoutingModule { }
