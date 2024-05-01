import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxFormModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { FsTextAreaComponent } from './fs-text-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FsTextAreaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxFormModule,
    DxValidatorModule,
    DxTextAreaModule,
  ],
  exports: [FsTextAreaComponent],
})
export class FsTextAreaModule {}
