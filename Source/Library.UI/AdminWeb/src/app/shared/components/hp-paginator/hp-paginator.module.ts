import { FormsModule } from '@angular/forms';
import { HpPaginatorComponent } from './hp-paginator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';



@NgModule({
  declarations: [HpPaginatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule
  ]
  ,exports:[
    HpPaginatorComponent
  ]
})
export class HpPaginatorModule { }
