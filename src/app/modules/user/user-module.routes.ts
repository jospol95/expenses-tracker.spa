import {Routes} from '@angular/router';
import {UserLoginComponent} from './components/user-login/user-login.component';
import {UserCategoriesComponent} from './components/user-dashboard/user-categories/user-categories.component';
import {UserAccountTabComponent} from './components/user-dashboard/user-account-tab/user-account-tab.component';
import {UserAccountsComponent} from './components/user-dashboard/user-accounts/user-accounts.component';
import {AboutTabComponent} from './components/user-dashboard/about-tab/about-tab.component';

export class UserModuleRoutes {
  public static routes: Routes = [
    {path: '',
      redirectTo: 'profile',
      pathMatch: 'full'
    },
    {path: 'profile',
      component: UserAccountTabComponent,
    },
    {
      path: 'accounts',
      component: UserAccountsComponent,
    },
    {
      path: 'about',
      component: AboutTabComponent,
    },
    {path: 'categories',
      component: UserCategoriesComponent,
    }
  ];
}
