import {Routes} from '@angular/router';
import {CalendarPageComponent} from '../../modules/calendar/components/calendar-page/calendar-page.component';
import {UserPageComponent} from '../../modules/user/components/user-page/user-page.component';

export  class SiteLayoutRoutes {
  public static routes: Routes = [
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

}
