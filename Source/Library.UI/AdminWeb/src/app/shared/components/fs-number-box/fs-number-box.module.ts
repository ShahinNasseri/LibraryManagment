import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DxCheckBoxModule,
  DxNumberBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { FsNumberBoxComponent } from './fs-number-box.component';

@NgModule({
  declarations: [FsNumberBoxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DxNumberBoxModule,
    DxValidatorModule,
  ],
  exports: [FsNumberBoxComponent],
})
export class FsNumberBoxModule {}
