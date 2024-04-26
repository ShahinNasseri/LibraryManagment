import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HpChartJsComponent } from './hp-chart-js.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HpChartJsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [HpChartJsComponent]
})
export class HpChartJsModule { }
