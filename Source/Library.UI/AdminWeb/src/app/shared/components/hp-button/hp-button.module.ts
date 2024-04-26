import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { HpButtonComponent } from './hp-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [HpButtonComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    RippleModule
  ],
  exports:[
    HpButtonComponent
  ]
})
export class HpButtonModule { }
