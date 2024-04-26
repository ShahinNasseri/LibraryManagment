import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContextMenuModule} from 'primeng/contextmenu';

import { HpContextmenuComponent } from './hp-contextmenu.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HpContextmenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    ContextMenuModule
  ],
  exports:[
    HpContextmenuComponent
  ]
})
export class HpContextmenuModule { }
