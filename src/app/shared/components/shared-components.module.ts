import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopNavbarComponent} from './top-navbar/top-navbar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';



@NgModule({
  declarations: [
    TopNavbarComponent,
    SiteFooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    TopNavbarComponent,
    SiteFooterComponent
  ]
})
export class SharedComponentsModule { }
