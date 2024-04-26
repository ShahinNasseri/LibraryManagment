import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputNumberModule } from 'primeng/inputnumber';
import { HpInputnumberComponent } from './hp-inputnumber.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HpInputnumberComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
  ],
  exports: [HpInputnumberComponent],
})
export class HpInputnumberModule {}
