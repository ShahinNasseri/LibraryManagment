import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HpLoadingComponent } from './hp-loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    HpLoadingComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
  ],
  exports: [
    HpLoadingComponent
  ]
})
export class HpLoadingModule { }
