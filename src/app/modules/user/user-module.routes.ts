import {Routes} from '@angular/router';
import {UserLoginComponent} from './components/user-login/user-login.component';
import {UserCategoriesComponent} from './components/user-dashboard/user-categories/user-categories.component';

export class UserModuleRoutes {
  public static routes: Routes = [
    {path: '',
      redirectTo: 'profile',
      pathMatch: 'full'
    },
    {path: 'profile',
      component: UserLoginComponent,
    },
    {path: 'categories',
      component: UserCategoriesComponent,
    }
  ];
}
