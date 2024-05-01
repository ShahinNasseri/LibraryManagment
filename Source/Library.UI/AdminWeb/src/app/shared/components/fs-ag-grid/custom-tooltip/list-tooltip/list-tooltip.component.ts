import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';

@Component({
  selector: 'fs-list-tooltip',
  templateUrl: './list-tooltip.component.html',
  styleUrls: ['./list-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTooltipComponent implements ITooltipAngularComp {
  param: any;
  agInit(params: ITooltipParams<any, any, any>): void {
    const lis = params.value
      .split(',')
      .map((item: string) => `<li>${item}</li>`)
      .join('');

    this.param = `<ul>${lis}</ul>`;
  }
}
