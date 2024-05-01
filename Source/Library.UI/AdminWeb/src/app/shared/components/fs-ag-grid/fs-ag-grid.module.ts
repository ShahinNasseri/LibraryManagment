import { PageSizeSelectorPaginationComponent } from './custom-status-bar-panels/page-size-selector-pagination/page-size-selector-pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsAgGridComponent } from './fs-ag-grid.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AggregationStatusBarComponent } from './custom-status-bar-panels/aggregation-status-bar/aggregation-status-bar.component';
import { CheckboxCellRenderComponent } from './custom-render-components/checkbox-cell-render/checkbox-cell-render.component';
import { FsButtonModule } from '../fs-button/fs-button.module';
import { PageSummeryStatusBarComponent } from './custom-status-bar-panels/page-summery-status-bar/page-summery-status-bar.component';
import { PaginationStatusBarComponent } from './custom-status-bar-panels/pagination-status-bar/pagination-status-bar.component';
import { BooleanCellRenderComponent } from './custom-render-components/boolean-cell-render/boolean-cell-render.component';

@NgModule({
  declarations: [
    FsAgGridComponent,
    CheckboxCellRenderComponent,
    AggregationStatusBarComponent,
    PaginationStatusBarComponent,
    PageSizeSelectorPaginationComponent,
    PageSummeryStatusBarComponent,
    BooleanCellRenderComponent,
  ],
  imports: [CommonModule, FormsModule, AgGridModule, FsButtonModule],
  exports: [FsAgGridComponent],
})
export class FsAgGridModule {}
