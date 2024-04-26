import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HpTextareaComponent } from './hp-textarea.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextareaModule} from 'primeng/inputtextarea';


@NgModule({
  declarations: [HpTextareaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule
  ],
  exports:[
    HpTextareaComponent
  ]
})
export class HpTextareaModule { }
