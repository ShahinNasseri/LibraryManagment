import { HpInputswitchComponent } from './hp-inputswitch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputSwitchModule} from 'primeng/inputswitch';


@NgModule({
  declarations: [HpInputswitchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule
  ],
  exports:[
    HpInputswitchComponent
  ]
})
export class HpInputswitchModule { }
