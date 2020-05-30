import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopNavbarComponent} from './top-navbar/top-navbar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    TopNavbarComponent,
    SiteFooterComponent
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
    SiteFooterComponent
  ]
})
export class SharedComponentsModule { }
