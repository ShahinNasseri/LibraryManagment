import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxSelectBoxModule, DxValidatorModule } from 'devextreme-angular';
import { FSSelectboxComponent } from './fs-selectbox.component';

@NgModule({
  declarations: [FSSelectboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DxValidatorModule,
    DxSelectBoxModule,
  ],
  exports: [FSSelectboxComponent],
})
export class FsSelectboxModule {}
