import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit ,ElementRef, Input, ViewChild } from '@angular/core';


import { ComponentInputValidationException } from '@hp/core/general/exceptions/component-input-validation-exception';
import Highcharts from '../../local-exports/highchart';

@Component({
  selector: 'hp-chart-hc',
  templateUrl: './hp-chart-hc.component.html',
  styleUrls: ['./hp-chart-hc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HpChartHcComponent implements AfterViewInit, OnInit {
  @ViewChild('container', {static: true }) container!: ElementRef<HTMLElement>;

  @Input() options!: Highcharts.Options;
  @Input() event?: Function;
  @Input() eventType?: string;
  @Input() eventSeriesDataType?: any;
  @Input() customFunction?: Function;

  @Input() highchart = Highcharts;

  constructor(private readonly cdr: ChangeDetectorRef){
  }

  ngOnInit(): void {
    if(this.options == null){
      throw new ComponentInputValidationException('Options Input in HpChartHcComponent Cannot be null');
    }
  }

  ngAfterViewInit(): void {

    if(this.customFunction != null){
      this.customFunction(this.container.nativeElement);
    }else{
      this.highchart.chart(this.container.nativeElement , this.options);
    }
    
    if(this.event != null){
      this.highchart.addEvent(this.eventSeriesDataType, this.eventType! , this.event);
    }

  }

}
