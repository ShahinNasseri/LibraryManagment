import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ColDef, ColGroupDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';

@Component({
  selector: 'hp-dashboard-builder-item',
  templateUrl: './dashboard-builder-item.component.html',
  styleUrls: ['./dashboard-builder-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardBuilderItemComponent {
  @Input() ReportTitle: string = '';
  @Input() ReportType: string = '';
  @Input() Response: any;


  res_gridApi: any = null;
  public res_columnDefs: any;
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: ' ',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      floatingFilter: false,
      suppressMenu: true,
      minWidth: 55,
      maxWidth: 55,
      width: 55,
      flex: 0,
      resizable: false,
      sortable: false,
      editable: false,
      filter: false,
      suppressColumnsToolPanel: true,
    },
    {
      headerName: 'Participant',
      children: [
        { field: 'athlete', minWidth: 170 },
        { field: 'country', minWidth: 150 },
      ],
    },
    { field: 'sport' },
    {
      headerName: 'Medals',
      children: [
        {
          field: 'total',
          columnGroupShow: 'closed',
          filter: 'agNumberColumnFilter',
          width: 120,
          flex: 0,
        },
        {
          field: 'gold',
          columnGroupShow: 'open',
          filter: 'agNumberColumnFilter',
          width: 100,
          flex: 0,
        },
        {
          field: 'silver',
          columnGroupShow: 'open',
          filter: 'agNumberColumnFilter',
          width: 100,
          flex: 0,
        },
        {
          field: 'bronze',
          columnGroupShow: 'open',
          filter: 'agNumberColumnFilter',
          width: 100,
          flex: 0,
        },
      ],
    },
    { field: 'year', filter: 'agNumberColumnFilter' },
  ];

  pieChartData: any = {};
  barChartData: any = {};
  chartData: any = {};


  public rowSelection: 'single' | 'multiple' = 'multiple';

  public res_defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    minWidth: 100,
    filter: true,
    resizable: true,
    floatingFilter: true,
    flex: 1,
  };

  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    minWidth: 100,
    filter: true,
    resizable: true,
    floatingFilter: true,
    flex: 1,
  };

  res_rowData: any[] = [];

  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: '',
  };


  constructor(private cdr: ChangeDetectorRef) {

  }

  createReport() {
    let colDefs = [];
    colDefs = this.generateColDefsFromJson(this.Response.sqlData);
    this.res_columnDefs = colDefs;
    this.res_rowData = this.Response.sqlData;

    if(this.ReportType == 'Grid'){
      if(this.res_gridApi != null){
        this.res_gridApi.setColumnDefs(this.res_columnDefs);
        this.res_gridApi.setRowData(this.res_rowData);
      }
    }else if(this.ReportType == 'Pie Chart'){
      const chtData = this.prepareChartData(this.res_rowData);
      this.pieChartData = {
        labels: chtData.labels,
        datasets: [{
          label: chtData.prop,
          data: chtData.data,
          backgroundColor: this.getBackgroundColors(chtData.data),
          borderWidth: 1
        }]
      };
    }else if(this.ReportType == 'Bar Chart'){
      const chtData = this.prepareChartData(this.res_rowData);
      this.barChartData = {
        labels: chtData.labels,
        datasets: [{
          label: chtData.prop,
          data: chtData.data,
          backgroundColor: this.getBackgroundColors(chtData.data),
          borderWidth: 1
        }]
      };
    }else{
      const chtData = this.prepareChartData(this.res_rowData);
      this.chartData = {
        labels: chtData.labels,
        datasets: [{
          label: chtData.prop,
          data: chtData.data,
          backgroundColor: this.getBackgroundColors(chtData.data),
          borderWidth: 1
        }]
      };
    }

    this.cdr.detectChanges();
  }

  getUniqueColors(num: any) {
    const uniqueColors = [
      '#1E90FF', '#8B0000', '#2E8B57', '#8A2BE2', '#A0522D', '#2F4F4F',
      '#800000', '#006400', '#483D8B', '#8B008B', '#556B2F', '#4B0082',
      '#9932CC', '#8B4513', '#9932CC', '#2E8B57', '#8B4513', '#483D8B',
      '#556B2F', '#4B0082',
      '#8B3626', '#1C1C1C', '#4B0082', '#8A2BE2', '#696969', '#2E8B57',
      '#8B4513', '#556B2F', '#8B0000', '#483D8B', '#A0522D', '#2F4F4F',
      '#8B3626', '#1C1C1C', '#4B0082', '#8A2BE2', '#696969', '#2E8B57',
      '#8B4513', '#556B2F', '#8B0000', '#483D8B',
      '#191970', '#8B008B', '#556B2F', '#8B4513', '#2F4F4F', '#8B3626',
      '#A0522D', '#483D8B', '#2E8B57', '#4B0082', '#1C1C1C', '#9932CC',
      '#696969', '#800000', '#006400', '#8A2BE2', '#8B0000', '#483D8B',
      '#556B2F', '#8B4513', '#8B3626', '#A0522D', '#191970', '#8B008B',
      '#556B2F', '#8B4513', '#2F4F4F', '#8B3626', '#A0522D', '#483D8B',
      '#2E8B57', '#4B0082', '#1C1C1C', '#9932CC', '#696969', '#800000',
      '#006400', '#8A2BE2', '#8B0000', '#483D8B'
    ];
    return uniqueColors.slice(0, num);
}

getBackgroundColors(data: any) {
    let bgColors: any[] = [];

    // For the first 10 or less
    const uniqueColors = this.getUniqueColors(data.length);
    bgColors = bgColors.concat(uniqueColors);

    // For any remaining colors
    const remainingColors = data.length - uniqueColors.length;
    for(let i = 0; i < remainingColors; i++) {
        bgColors.push(this.getRandomDarkGradientColor());
    }

    return bgColors;
}

  prepareChartData(dataList: any) {
    const labels: any[] = [];
    const values: any[] = [];
    let valueProperty: any;
    dataList.forEach((item: any) => {
      const properties = Object.keys(item);
      valueProperty = properties[properties.length - 1]; // Last property for y-axis
      const labelProperties = properties.slice(0, -1); // All properties except the last one for x-axis

      const label = labelProperties.map(prop => item[prop]).join(' '); // Combine properties for label
      labels.push(label);
      values.push(item[valueProperty]);
    });

    return {
      labels,
      data: values,
      prop: valueProperty
    };
  }

  // Function to select a random color from the darkColors array
  getRandomDarkGradientColor() {
    // Predefined array of dark gradient colors
    const darkColors = [
      '#1E90FF', '#8B0000', '#2E8B57', '#8A2BE2', '#A0522D', '#2F4F4F',
      '#800000', '#006400', '#483D8B', '#8B008B', '#556B2F', '#4B0082',
      '#9932CC', '#8B4513', '#9932CC', '#2E8B57', '#8B4513', '#483D8B',
      '#556B2F', '#4B0082',
      '#8B3626', '#1C1C1C', '#4B0082', '#8A2BE2', '#696969', '#2E8B57',
      '#8B4513', '#556B2F', '#8B0000', '#483D8B', '#A0522D', '#2F4F4F',
      '#8B3626', '#1C1C1C', '#4B0082', '#8A2BE2', '#696969', '#2E8B57',
      '#8B4513', '#556B2F', '#8B0000', '#483D8B',
      '#191970', '#8B008B', '#556B2F', '#8B4513', '#2F4F4F', '#8B3626',
      '#A0522D', '#483D8B', '#2E8B57', '#4B0082', '#1C1C1C', '#9932CC',
      '#696969', '#800000', '#006400', '#8A2BE2', '#8B0000', '#483D8B',
      '#556B2F', '#8B4513', '#8B3626', '#A0522D', '#191970', '#8B008B',
      '#556B2F', '#8B4513', '#2F4F4F', '#8B3626', '#A0522D', '#483D8B',
      '#2E8B57', '#4B0082', '#1C1C1C', '#9932CC', '#696969', '#800000',
      '#006400', '#8A2BE2', '#8B0000', '#483D8B'
    ];


    const randomDarkColor = darkColors[Math.floor(Math.random() * darkColors.length)];

    return randomDarkColor;
  }

  onResGridReady(params: GridReadyEvent<any>) {
    this.res_gridApi = params.api;
    this.cdr.detectChanges();
  }

  private generateColDefsFromJson(jsonData: any) {
    const colDefKeys = Object.keys(jsonData[0]);

    return colDefKeys.map(key => {
      return {
        headerName: key,
        field: key,
      };
    });
  }

}
