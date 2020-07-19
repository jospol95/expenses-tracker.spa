import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopNavbarComponent} from './top-navbar/top-navbar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import {RouterModule} from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    TopNavbarComponent,
    SiteFooterComponent,
    BasePageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    TopNavbarComponent,
    SiteFooterComponent,
    BasePageComponent
  ]
})
export class SharedComponentsModule { }
