import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { GridStack, ColumnOptions, GridStackOptions, GridStackWidget } from 'gridstack';
import { DashboardBuilderItemComponent } from '../dashboard-builder-item/dashboard-builder-item.component';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@core/ai/http.service';

@Component({
  selector: 'dashboard-builder-grid-container',
  templateUrl: './dashboard-builder-grid-container.component.html',
  styleUrls: ['./dashboard-builder-grid-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DashboardBuilderGridContainerComponent implements AfterViewInit {
  grid!: GridStack;
  showDialog: boolean = false;
  reportTitle: string = '';
  reportPrompt: string = '';
  reportType: string = 'Grid';
  reportDatabase: string = 'NBA Players';
  reportGptModel: string = 'GPT-3.5 Turbo';
  response: any;
  
  databaseDDatasource: any[] = [
    { key: 'NBA Players', value: 'NBA Players' },
    { key: 'Employee', value: 'Employee' },
    { key: 'SellingBooks', value: 'SellingBooks' },
    { key: 'Employee2', value: 'Employee2' },
    { key: 'Titanic', value: 'Titanic' },
  ];

  gptmodelDataSource: any[] = [
    { key: 'GPT-3.5 Turbo', value: 'GPT-3.5 Turbo' },
    { key: 'Instructed GPT', value: 'Instructed GPT' }
  ];

  reportTypeDatasource: any[] = [
    { key: 'Grid', value: 'Grid' },
    { key: 'Pie Chart', value: 'Pie Chart' },
    { key: 'Bar Chart', value: 'Bar Chart' },
    { key: 'Doughnut Chart', value: 'Doughnut Chart' },
    { key: 'Line Chart', value: 'Line Chart' },
    { key: 'PolarArea Chart', value: 'PolarArea Chart' },
  ];


  constructor(private viewContainerRef: ViewContainerRef,
     private readonly cdr: ChangeDetectorRef,
     private httpService: HttpService){

  }


  ngAfterViewInit(): void {
    const options: GridStackOptions = {
      column: 12,
      float: true,
      acceptWidgets: true,
      animate: true,
    };
    this.grid = GridStack.init(options);
  }

  clearDialogContent(){
    this.reportTitle = '';
    this.reportPrompt = '';
    this.reportType = 'Grid';
    this.reportDatabase = 'NBA Players';
    this.reportGptModel = 'GPT-3.5 Turbo';
    this.response = null;
    this.cdr.detectChanges();
  }

  async addDashItem(){
    const res = await this.sendDataToGPT();

    if(res == true){
      this.addWidget();
      this.showDialog = false;
    }
    this.cdr.detectChanges();
  }

  addReport(){
    this.clearDialogContent();
    this.showDialog = true;
    this.cdr.detectChanges();
  }


  addGridstackWidget(widgetElement: HTMLElement) {
    const options: GridStackWidget = {
      x: 0,
      y: 0,
      minW: 4,
      minH: 4,
    };
  
    this.grid.addWidget(widgetElement, options);
  }
  
  addWidget() {
    const widgetRef = this.viewContainerRef.createComponent(DashboardBuilderItemComponent);
    widgetRef.instance.ReportTitle = this.reportTitle;
    widgetRef.instance.ReportType = this.reportType;
    widgetRef.instance.Response = this.response;
    widgetRef.instance.createReport();
    // Add to Gridstack
    this.addGridstackWidget(widgetRef.location.nativeElement);
  }

  async sendDataToGPT() {
    if (this.reportPrompt.trim().length == 0) {
      return false;
    }

    const sendModel = 
    { text: this.reportPrompt, database: this.reportDatabase, gptModel: this.reportGptModel };
    this.response = await lastValueFrom(this.httpService.rawPost('api/gptdb', sendModel, true));
    return true;
  }

}
