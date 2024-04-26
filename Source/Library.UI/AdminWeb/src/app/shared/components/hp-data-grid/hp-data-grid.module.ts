import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HpDataGridComponent } from './hp-data-grid.component';
import { ContextMenuModule } from 'primeng/contextmenu';


@NgModule({
  declarations: [HpDataGridComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ContextMenuModule,
  ],
  exports: [HpDataGridComponent],
})
export class HpDataGridModule { }
