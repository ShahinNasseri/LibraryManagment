import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, DefaultDataPoint, ChartOptions, Plugin, registerables } from 'chart.js';


@Component({
  selector: 'hp-chart-js',
  templateUrl: './hp-chart-js.component.html',
  styleUrls: ['./hp-chart-js.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HpChartJsComponent implements AfterViewInit, OnInit {

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  @Input() type: ChartType | null = null;
  @Input() data: DefaultDataPoint<ChartType> | any | null = null;
  @Input() options: ChartOptions<ChartType> | null = null;
  @Input() plugins: Plugin<ChartType> | any | null = null;


  chart?: Chart;
  configuration!: ChartConfiguration | any;

  constructor() {
  }

  ngOnInit(): void {
    if (this.type == null || this.data == null || this.options == null) {
      throw new Error("for hp-chart-js you must provide ['type', 'data' , 'options'] inputs data");
    }
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    this.configuration = {
      type: this.type!,
      data: this.data!,
      options: this.options!,
      plugins: this.plugins
    };

    this.chart = new Chart(this.chartContainer.nativeElement, this.configuration);
  }


  updateChartWithData(data?: DefaultDataPoint<ChartType> | any) {
    if (data != null) {
      this.chart!.data = data;
    } else {
      this.chart!.data = this.data
    }

    this.chart!.update();
  }

  updateChartWithOptions(options?: ChartOptions<ChartType>) {
    // for options we cant update chart we must renew the chart
    this.chart!.destroy();
    const chartOptions = options ?? this.options;
    this.configuration.options = chartOptions;
    this.chart = new Chart(this.chartContainer.nativeElement, this.configuration!);
  }

}
