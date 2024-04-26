import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HpTextboxComponent } from './hp-textbox.component';



@NgModule({
  declarations: [HpTextboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  exports: [HpTextboxComponent]
})
export class HpTextboxModule { }
