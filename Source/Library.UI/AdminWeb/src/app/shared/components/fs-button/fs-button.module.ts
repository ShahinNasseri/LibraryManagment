import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { FsButtonComponent } from './fs-button.component';

@NgModule({
  declarations: [FsButtonComponent],
  imports: [CommonModule, DxButtonModule, DxLoadIndicatorModule],
  exports: [FsButtonComponent],
})
export class FsButtonModule {}
