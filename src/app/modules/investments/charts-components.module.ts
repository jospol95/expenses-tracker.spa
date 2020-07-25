import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsPageComponent} from './charts-page/charts-page.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ChartsPageComponent],
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        MatButtonModule
    ]
})
export class ChartsComponentModule {
}

