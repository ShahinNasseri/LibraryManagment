import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HpMultiselectComponent } from './hp-multiselect.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MultiSelectModule} from 'primeng/multiselect';


@NgModule({
  declarations: [HpMultiselectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule
  ],
  exports:[
    HpMultiselectComponent
  ]
})
export class HpMultiselectModule { }
