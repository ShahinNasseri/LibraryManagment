import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxSelectBoxModule } from 'devextreme-angular';
import { HpDxDropDownListComponent } from './hp-dx-drop-down-list.component';



@NgModule({
  declarations: [HpDxDropDownListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DxSelectBoxModule,
  ],
  exports: [HpDxDropDownListComponent]
})
export class HpDxDropDownListModule { }
