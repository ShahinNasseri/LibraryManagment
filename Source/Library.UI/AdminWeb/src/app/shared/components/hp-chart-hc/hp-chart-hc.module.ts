import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HpChartHcComponent } from './hp-chart-hc.component';



@NgModule({
  declarations: [HpChartHcComponent],
  imports: [
    CommonModule,
  ],exports:[HpChartHcComponent]
})
export class HpChartHcModule { }
