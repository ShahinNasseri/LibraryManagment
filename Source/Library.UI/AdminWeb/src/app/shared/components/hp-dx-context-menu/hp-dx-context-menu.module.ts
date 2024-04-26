import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HpDxContextMenuComponent } from './hp-dx-context-menu.component';
import { FormsModule } from '@angular/forms';
import { DxContextMenuModule } from 'devextreme-angular';



@NgModule({
  declarations: [HpDxContextMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    DxContextMenuModule,

  ],exports:[HpDxContextMenuComponent]
})
export class HpDxContextMenuModule { }
