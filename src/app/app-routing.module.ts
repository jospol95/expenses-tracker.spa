import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SiteLayoutComponent} from './layout/site-layout/site-layout.component';
import {AuthGuardService} from './shared/guards/auth-guard.service';
import {AuthPageComponent} from './modules/auth/auth-page/auth-page.component';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuardService],
    loadChildren: () => import('./layout/site-layout/site-layout.module')
      .then(m => m.SiteLayoutModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
