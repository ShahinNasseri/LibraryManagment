import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'boolean-render',
  templateUrl: './boolean-cell-render.component.html',
  styleUrls: ['./boolean-cell-render.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooleanCellRenderComponent implements ICellRendererAngularComp {
  public cellValue: boolean | undefined;
  public params: ICellRendererParams | undefined;

  constructor() {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    this.cellValue = this.getValueToDisplay(params);
  }
  // gets called whenever the cell refreshes
  refresh(params: ICellRendererParams<any, any>): boolean {
    this.params = params;
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  getValueToDisplay(params: ICellRendererParams) {
    if (typeof params.valueFormatted == 'string')
      params.valueFormatted = JSON.parse(params.valueFormatted);
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  setValueToDisplay(params: ICellRendererParams) {
    let value: string = '';

    switch (params.value) {
      case true:
        value = params.column?.getColDef().filterParams.trueLabel;
        break;
      case false:
        value = params.column?.getColDef().filterParams.falseLabel;
        break;

      default:
        value = 'Unknown';
        break;
    }

    return value;
  }
}
