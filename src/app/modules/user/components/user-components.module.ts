import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserPageComponent} from './user-page/user-page.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserRegisterComponent} from './user-register/user-register.component';
import {FormsModule} from '@angular/forms';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {UserMonthSummaryComponent} from './user-dashboard/user-month-summary/user-month-summary.component';
import {UserCategoriesComponent} from './user-dashboard/user-categories/user-categories.component';
import {MatIconModule} from '@angular/material/icon';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {UserCategoriesListItemComponent} from './user-dashboard/user-categories/user-categories-list-item/user-categories-list-item.component';
import {SharedComponentsModule} from '../../../shared/components/shared-components.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    UserPageComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserDashboardComponent,
    UserMonthSummaryComponent, UserCategoriesComponent, UserCategoriesListItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    SweetAlert2Module,
    SharedComponentsModule,
    RouterModule,
  ],
  exports: [UserPageComponent]
})
export class UserComponentsModule {
}
