import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiteLayoutComponent} from './site-layout.component';
import {SiteLayoutRoutingModule} from './site-layout.routing.module';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {CustomPipesModule} from '../../shared/pipes/custom-pipes.module';


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
    SharedComponentsModule,
    CustomPipesModule
  ],
  exports: [CustomPipesModule, SharedComponentsModule]
})
export class SiteLayoutModule { }
