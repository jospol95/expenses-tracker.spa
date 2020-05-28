import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SiteLayoutComponent} from './layout/site-layout/site-layout.component';


const routes: Routes = [
  {path: '',
    component: SiteLayoutComponent,
    loadChildren: () =>  import('./layout/site-layout/site-layout.module').then(m => m.SiteLayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
