import {RouterModule, Routes} from '@angular/router';
import {SiteLayoutComponent} from './site-layout.component';
import {NgModule} from '@angular/core';
import {CalendarPageComponent} from '../../modules/calendar/components/calendar-page/calendar-page.component';
// import {UserPageComponent} from '../../modules/user/components/user-page/user-page.component';
// import * from '../../modules/user/components/user-components.module'
import {UserComponentsModule} from '../../modules/user/components/user-components.module';
import {UserPageComponent} from '../../modules/user/components/user-page/user-page.component';
import {ChartsPageComponent} from '../../modules/charts/components/charts-page/charts-page.component';
import {ChartsComponentsModule} from '../../modules/charts/components/charts-components.module';
import {LandingPageComponent} from '../../modules/home/components/landing-page/landing-page.component';
import {CalendarLayoutComponent} from '../../modules/calendar/components/calendar-layout/calendar-layout.component';
import {CalendarModule} from '../../modules/calendar/calendar.module';
import {CalendarComponentsModule} from '../../modules/calendar/components/calendar-components.module';
import {ReportsPageComponent} from '../../modules/reports/reports-page/reports-page.component';
import {ChartsComponentModule} from '../../modules/reports/reports-components.module';
import {HomeModule} from '../../modules/home/home.module';
import {HomePageResolver} from '../../modules/home/resolvers/home-page.resolver';
import {FacadesResolver} from '../../shared/resolvers/facades.resolver';

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
  {path: 'user',
    component: UserPageComponent,
    loadChildren: () => import('../../modules/user/user.module')
      .then(u => u.UserModule)
  },
  // {path: 'user-profile/login',
  //   component: UserPageComponent
  // },
  {path: 'charts',
    component: ChartsPageComponent
  },
  {path: 'home',
    component: LandingPageComponent,
    resolve: { data: HomePageResolver}
  },
  {
    path: 'reports',
    component: ReportsPageComponent,
    resolve: {data: FacadesResolver}
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UserComponentsModule,
    ChartsComponentsModule,
    HomeModule,
    CalendarModule,
    ChartsComponentModule
  ],
  exports: [RouterModule]
})

export class SiteLayoutRoutingModule { }
