import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';


@Component({
  selector: 'aggregation-status-bar',
  templateUrl: './aggregation-status-bar.component.html',
  styleUrls: ['./aggregation-status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AggregationStatusBarComponent implements  IStatusPanelAngularComp {

  private params: IStatusPanelParams | undefined;

  constructor() { }

  agInit(params: IStatusPanelParams): void {
    this.params = params;

    this.params.api.addAggFunc(`sum`, (e: any) => {
    });

    console.log(this.params);
  }

}
