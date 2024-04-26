import { TooltipModule } from 'primeng/tooltip';
import { HpToolbarComponent } from './hp-toolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToolbarModule} from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { HpButtonModule } from '../hp-button/hp-button.module';
import { HpTextboxModule } from '../hp-textbox/hp-textbox.module';


@NgModule({
  declarations: [HpToolbarComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    HpButtonModule,
    HpTextboxModule,
    FormsModule,
    TooltipModule
  ],exports:[
    HpToolbarComponent
  ]
})
export class HpToolbarModule { }
