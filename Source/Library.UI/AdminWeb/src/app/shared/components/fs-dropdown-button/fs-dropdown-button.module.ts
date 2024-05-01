import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsDropdownButtonComponent } from './fs-dropdown-button.component';
import { FormsModule } from '@angular/forms';
import { DxDropDownButtonModule } from 'devextreme-angular';



@NgModule({
  declarations: [FsDropdownButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    DxDropDownButtonModule
  ],exports:[FsDropdownButtonComponent]
})
export class FsDropdownButtonModule { }
