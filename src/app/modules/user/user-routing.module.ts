import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CalendarPageComponent} from '../calendar/components/calendar-page/calendar-page.component';
import {CalendarResolver} from '../calendar/resolvers/calendar.resolver';
import {CalendarNewPageComponent} from '../calendar/components/calendar-new-page/calendar-new-page.component';
import {CalendarNewPageResolver} from '../calendar/resolvers/calendar-new-page.resolver';
import {UserLoginComponent} from './components/user-login/user-login.component';
import {UserCategoriesComponent} from './components/user-dashboard/user-categories/user-categories.component';
import {UserComponentsModule} from './components/user-components.module';
import {UserModuleRoutes} from './user-module.routes';


// const routes: Routes = [
//   {path: 'profile',
//     component: UserLoginComponent,
//   },
//   {path: 'categories',
//     component: UserCategoriesComponent,
//   }
// ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserComponentsModule,
    RouterModule.forChild(UserModuleRoutes.routes)
    // RouterModule.forChild(routes),
  ]
})
export class UserRoutingModule { }
