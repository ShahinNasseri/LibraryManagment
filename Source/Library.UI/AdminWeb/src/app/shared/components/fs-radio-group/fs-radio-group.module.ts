import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FsRadioGroupComponent } from './fs-radio-group.component';
import { DxRadioGroupModule } from 'devextreme-angular';

@NgModule({
  declarations: [FsRadioGroupComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,DxRadioGroupModule],
  exports: [FsRadioGroupComponent],
})
export class FsRadioGroupModule {}
