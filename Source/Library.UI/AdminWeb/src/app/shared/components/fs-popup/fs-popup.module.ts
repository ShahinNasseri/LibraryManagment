import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxMenuModule, DxPopupModule, DxToolbarModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

import { FsPopupComponent } from './fs-popup.component';
import { FsButtonModule } from '../fs-button/fs-button.module';

@NgModule({
  declarations: [FsPopupComponent],
  imports: [CommonModule, FormsModule, DxPopupModule, DxToolbarModule,DxMenuModule,FsButtonModule],
  exports: [FsPopupComponent],
})
export class FsPopupModule {}
