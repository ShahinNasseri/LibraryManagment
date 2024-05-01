import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';
import { AgGridLocalService } from '../../services/ag-grid-local.service';

@Component({
  selector: 'page-size-selector-status-bar',
  templateUrl: './page-size-selector-pagination.component.html',
  styleUrls: ['./page-size-selector-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSizeSelectorPaginationComponent
  implements IStatusPanelAngularComp
{
  pageSize: number | undefined;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  title: string = 'PageSize ';
  private params: IStatusPanelParams | undefined;

  private _localService: AgGridLocalService = inject(AgGridLocalService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);


  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  agInit(params: IStatusPanelParams | any): void {
    this._localService.pageSize$.subscribe((pageSize) => {
      this.pageSize = pageSize;
      this._cdr.detectChanges();
    });

    // Initialize the page size with the current grid page size
    this.pageSize = params.api?.paginationGetPageSize() || 10;
    // Receive pageSizeOptions dynamically from statusPanelParams
    this.pageSizeOptions = params.pageSizeOptions || this.pageSizeOptions;
    this.title = params.title ?? this.title;
    this.params = params;
  }

  onPageSizeChange(): void {
    // Update the grid page size when the user changes the selection
    const newPageSize = parseInt(this.pageSize!.toString(), 10);
    this.params!.api?.paginationSetPageSize(newPageSize);
  }
}
