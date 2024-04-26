import { HpDropdownComponent } from './hp-dropdown.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';



@NgModule({
  declarations: [HpDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    SkeletonModule,
  ],
  exports:[
    HpDropdownComponent
  ]
})
export class HpDropdownModule { }
