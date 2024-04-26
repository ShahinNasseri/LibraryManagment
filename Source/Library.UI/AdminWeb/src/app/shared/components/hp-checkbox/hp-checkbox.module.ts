import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HpCheckboxComponent } from './hp-checkbox.component';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
  declarations: [HpCheckboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule
  ],
  exports:[
    HpCheckboxComponent
  ]
})
export class HpCheckboxModule { }
