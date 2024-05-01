import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsToolbarComponent } from './fs-toolbar.component';
import { FormsModule } from '@angular/forms';
import { DxMenuModule, DxToolbarModule } from 'devextreme-angular';
import { GetAttributePipe } from './get-attribute.pipe';
import { FsswitchModule } from '../fs-switch/fs-switch.module';


@NgModule({
  declarations: [FsToolbarComponent, GetAttributePipe],
  imports: [
    CommonModule,
    FormsModule,
    DxMenuModule,
    DxToolbarModule,
    FsswitchModule
  ],
  exports:[FsToolbarComponent]
})
export class FsToolbarModule { }
