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
import {LandingPageComponent} from '../../modules/home/components/landing-page/landing-page.component';
import {CalendarLayoutComponent} from '../../modules/calendar/components/calendar-layout/calendar-layout.component';
import {CalendarModule} from '../../modules/calendar/calendar.module';
import {CalendarComponentsModule} from '../../modules/calendar/components/calendar-components.module';
import {ChartsPageComponent} from '../../modules/investments/charts-page/charts-page.component';
import {ChartsComponentModule} from '../../modules/investments/charts-components.module';
import {HomeModule} from '../../modules/home/home.module';
import {HomePageResolver} from '../../modules/home/resolvers/home-page.resolver';

const routes: Routes = [
  {path: '',
    redirectTo: 'home',
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
    component: LandingPageComponent,
    resolve: { data: HomePageResolver}
  },
  {
    path: 'charts',
    component: ChartsPageComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UserComponentsModule,
    ReportsComponentsModule,
    HomeModule,
    CalendarModule,
    ChartsComponentModule
  ],
  exports: [RouterModule]
})

export class SiteLayoutRoutingModule { }
