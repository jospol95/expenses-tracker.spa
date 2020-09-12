import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopNavbarComponent} from './top-navbar/top-navbar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import {RouterModule} from '@angular/router';
import { BasePageComponent } from './base-page/base-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { FacadeListItemComponent } from './facade-list-item/facade-list-item.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    TopNavbarComponent,
    SiteFooterComponent,
    BasePageComponent,
    FacadeListItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    SweetAlert2Module,
    FormsModule
  ],
  exports: [
    TopNavbarComponent,
    SiteFooterComponent,
    BasePageComponent,
    FacadeListItemComponent
  ]
})
export class SharedComponentsModule { }
