import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';

@Component({
  selector: 'fs-pagination-status-bar',
  templateUrl: './pagination-status-bar.component.html',
  styleUrls: ['./pagination-status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationStatusBarComponent  implements IStatusPanelAngularComp , OnDestroy {

  params: IStatusPanelParams | undefined;
  currentPage: number | undefined;
  totalPage: number | undefined;
  isFirstPage: boolean | undefined;
  isLastPage: boolean | undefined;




  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  agInit(params: IStatusPanelParams<any, any>): void {
    this.params = params;
    this.params.api.addEventListener('paginationChanged', () =>{
      this.getCurrentPage();
      this.getTotalPages();
      this.updateIsFirstPage();
      this.updateIsLastPage();
      this._cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
  }


  goToPreviousPage(): void {
    this.params!.api.paginationGoToPreviousPage();
  }

  goToNextPage(): void {
    this.params!.api.paginationGoToNextPage();
  }

  getCurrentPage(): void {
    this.currentPage = this.params!.api.paginationGetCurrentPage() + 1;
  }

  getTotalPages(): void {
    this.totalPage = this.params!.api.paginationGetTotalPages();
  }

  updateIsFirstPage(): void {
    this.isFirstPage = this.currentPage === 1;
  }

  updateIsLastPage(): void {
    this.isLastPage = this.currentPage === this.totalPage;
  }

}
