import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxFormModule,
  DxTextBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { FsTextBoxComponent } from './fs-text-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxoLabelModule } from 'devextreme-angular/ui/nested';

@NgModule({
  declarations: [FsTextBoxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxFormModule,
    DxoLabelModule,
    DxValidatorModule,
  ],
  exports: [FsTextBoxComponent],
})
export class FsTextBoxModule {}
