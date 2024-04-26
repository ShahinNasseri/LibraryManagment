import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HpTreeGridComponent } from './hp-tree-grid.component';
import { TreeTableModule } from 'primeng/treetable';
import { ContextMenuModule } from 'primeng/contextmenu';


@NgModule({
  declarations: [HpTreeGridComponent],
  imports: [
    CommonModule,
    FormsModule,
    TreeTableModule,
    ContextMenuModule
  ],
  exports: [HpTreeGridComponent]
})
export class HpTreeGridModule { }
