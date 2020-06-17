import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopNavbarComponent} from './top-navbar/top-navbar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';



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
        RouterModule
    ],
  exports: [
    TopNavbarComponent,
    SiteFooterComponent,
    BasePageComponent
  ]
})
export class SharedComponentsModule { }
