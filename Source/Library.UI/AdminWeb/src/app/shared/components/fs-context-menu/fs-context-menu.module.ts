import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxContextMenuModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { FsContextMenuComponent } from './fs-context-menu.component';



@NgModule({
  declarations: [FsContextMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    DxContextMenuModule,
  ],
  exports:[FsContextMenuComponent]
})
export class FsContextMenuModule { }
