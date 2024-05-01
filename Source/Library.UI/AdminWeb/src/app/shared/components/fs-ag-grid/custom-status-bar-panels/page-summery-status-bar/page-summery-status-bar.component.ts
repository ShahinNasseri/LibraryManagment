import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';

@Component({
  selector: 'fs-page-summery-status-bar',
  templateUrl: './page-summery-status-bar.component.html',
  styleUrls: ['./page-summery-status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSummeryStatusBarComponent implements IStatusPanelAngularComp , OnDestroy {

  params: IStatusPanelParams | undefined;
  text: string | undefined;

  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  agInit(params: IStatusPanelParams<any, any>): void {
    this.params = params;
    this.params.api.addEventListener('paginationChanged', () =>{
      this.updateSummeryText();
    });
  }

  ngOnDestroy(): void {
    this.params!.api.removeEventListener('paginationChanged',() => {});
  }

  updateSummeryText(): void {
    const startIndex = this.params!.api.getFirstDisplayedRow() + 1;
    const endIndex = this.params!.api.getLastDisplayedRow() + 1;
    const totalRecords = this.params!.api.getDisplayedRowCount();

    this.text = `Record ${startIndex} To ${endIndex} From ${totalRecords}`;
    this._cdr.detectChanges();
  }
}
