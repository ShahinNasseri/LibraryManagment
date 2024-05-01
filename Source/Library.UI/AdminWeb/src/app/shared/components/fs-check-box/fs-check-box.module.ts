import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxCheckBoxModule } from 'devextreme-angular';
import { FsCheckBoxComponent } from './fs-check-box.component';

@NgModule({
  declarations: [FsCheckBoxComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DxCheckBoxModule],
  exports: [FsCheckBoxComponent],
})
export class FsCheckBoxModule {}
