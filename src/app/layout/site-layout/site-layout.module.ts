import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiteLayoutComponent} from './site-layout.component';
import {SiteLayoutRoutingModule} from './site-layout.routing.module';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    SiteLayoutComponent,
  ],
  imports: [
    SiteLayoutRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    SharedComponentsModule
  ]
})
export class SiteLayoutModule { }
