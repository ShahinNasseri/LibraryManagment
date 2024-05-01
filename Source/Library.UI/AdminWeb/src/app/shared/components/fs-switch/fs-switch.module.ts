import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { DxSwitchModule } from 'devextreme-angular';
import { FsSwitchComponent } from './fs-switch.component';



@NgModule({
  declarations: [FsSwitchComponent],
  imports: [
    CommonModule,
    FormsModule,
    DxSwitchModule,
    ReactiveFormsModule
  ],
  exports:[FsSwitchComponent]
})
export class FsswitchModule { }
