import { ChangeDetectionStrategy, ChangeDetectorRef, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
  SideBarDef,
} from 'ag-grid-community';
import 'chart.js';
import * as XLSX from 'xlsx';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpService } from '@core/ai/http.service';
import { AlertService } from '@core/general/alert.service';

@Component({
  selector: 'hp-gpt-assistant',
  templateUrl: './gpt-assistant.component.html',
  styleUrls: ['./gpt-assistant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GptAssistantComponent implements AfterViewInit {
  prompt: string = '';

  res_gridApi: any = null;
  gridApi: any = null;

  showDialog: boolean = false;
  currentChatgptResopnse: any = {};

  chatHistory: ChatHistory[] = [];

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

  public rowData!: any[];

  databaseDDatasource: any[] = [
    { key: 'Titanic', value: 1 },
    { key: 'Employee', value: 2 },
    { key: 'NBA Players', value: 3 },
    { key: 'SellingBooks', value: 4 },
    { key: 'Employee2', value: 5 },
  ];

  gptmodelDataSource: any[] = [
    { key: 'GPT-3.5 Turbo', value: 1 },
    { key: 'Instructed GPT', value: 2 }
  ];

  showTableDropDown: boolean = false;

  selectedDatabase: string = 'NBA Players';
  selectedTable: string = 'employees';
  selectedGPTModel: string = 'GPT-3.5 Turbo';

  showPieChart: boolean = true;
  showBarChart: boolean = true;
  showDataGrid: boolean = true;
  showPrompt: boolean = true;

  showHistoryDialog: boolean = false;


  tableDatasource: any[] = [
    { key: 'employees', value: 1 },
    { key: 'departments', value: 2 },
    { key: 'salaries', value: 3 },
    { key: 'titles', value: 4 }
  ];

  pieChartData: any = {};
  barChartData: any = {};



  constructor(private httpService: HttpService, 
    private readonly cdr: ChangeDetectorRef, private alertService: AlertService) { }

  ngAfterViewInit(): void {
    const storedChatHistory = localStorage.getItem('chatHistory');
    if (storedChatHistory) {
      this.chatHistory = JSON.parse(storedChatHistory);
    }
  }

  getChatCompletion() {
    this.sendDataToGPT();
  }

  exportExcel() {
    this.exportToExcel(this.res_rowData, 'excelData');
  }

  exportPdf() {
    const pdfMake1: any = pdfMake;
    pdfMake1.vfs = pdfFonts.pdfMake.vfs;
    // Determine the table headers dynamically based on the available fields
    const headers = Object.keys(this.res_rowData[0]);

    // Create the table body with data
    const body = this.res_rowData.map(item => headers.map(field => item[field]));

    const docDefinition = {
      content: [
        { text: 'Exported Data', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: headers.map(() => '*'), // Dynamically set column widths
            body: [
              headers, // Table headers
              ...body
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake1.createPdf(docDefinition).download('exported_data.pdf');

  }

  exportCSV() {
    // Ensure there is data to export
    if (this.res_rowData.length === 0) {
      console.warn('No data to export.');
      return;
    }

    // Extract the keys (header) from the first object to use as CSV column headers
    const headers = Object.keys(this.res_rowData[0]);

    // Convert the data to a CSV string
    const csv = this.res_rowData.map(item =>
      headers.map(header => item[header]).join(',')
    ).join('\n');

    // Create a Blob containing the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element for downloading
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.csv';

    // Trigger a click event on the anchor element to initiate the download
    document.body.appendChild(a);
    a.click();

    // Cleanup: Remove the anchor element and revoke the URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  exportToJSON() {
    // Ensure there is data to export
    if (this.res_rowData.length === 0) {
      console.warn('No data to export.');
      return;
    }
  
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(this.res_rowData, null, 2);
  
    // Create a Blob containing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
  
    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);
  
    // Create an anchor element for downloading
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.json';
  
    // Trigger a click event on the anchor element to initiate the download
    document.body.appendChild(a);
    a.click();
  
    // Cleanup: Remove the anchor element and revoke the URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private exportToExcel(dataArray: any, fileName: any) {
    const ws = XLSX.utils.json_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName + '.xlsx');
  }

  async sendDataToGPT() {
    if (this.prompt && this.prompt.trim().length == 0) {
      return;
    }

    const sendModel = 
    { text: this.prompt, database: this.selectedDatabase, gptModel: this.selectedGPTModel };
    const response = await lastValueFrom(this.httpService.rawPost('api/gptdb', sendModel, true));
    this.currentChatgptResopnse = response;

    let colDefs = [];
    colDefs = this.generateColDefsFromJson(response.sqlData);
    this.res_columnDefs = colDefs;
    this.res_rowData = response.sqlData;
    this.res_gridApi.setColumnDefs(this.columnDefs);
    this.res_gridApi.setRowData(this.res_rowData);
    const chtData = this.prepareChartData(this.res_rowData);
    this.barChartData = {
      labels: chtData.labels,
      datasets: [{
        label: chtData.prop,
        data: chtData.data,
        backgroundColor: chtData.data.map(() => this.getRandomDarkGradientColor()),
        borderWidth: 1
      }]
    };

    this.pieChartData = {
      labels: chtData.labels,
      datasets: [{
        label: chtData.prop,
        data: chtData.data,
        backgroundColor: chtData.data.map(() => this.getRandomDarkGradientColor()),
        borderWidth: 1
      }]
    };

    // add result to chatHistory 
    this.addChat({
      question: this.prompt,
      response: this.currentChatgptResopnse ,
      database: this.selectedDatabase,
      gptModel: this.selectedGPTModel});

    if(this.showHistoryDialog)
      this.showHistoryDialog = false;
    
    this.showDialog = true;

    this.cdr.detectChanges();
  }

  addChat(newChat: ChatHistory) {
    this.chatHistory.push(newChat);
    localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    this.cdr.detectChanges();
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

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.fetchRealtedData();
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

  onHistoryButtonClick(){
    if(this.showDialog){
      this.showDialog = false;
      this.showHistoryDialog = true;
    }else{
      this.showHistoryDialog = !this.showHistoryDialog;
    }

    this.cdr.detectChanges();
  }

  onDBDropdownChange(e: any) {
    if(e == null)
      return;
    
    if (e == 'Employee') {
      this.showTableDropDown = true;
    } else {
      this.showTableDropDown = false;
    }

    this.selectedDatabase = e;
    this.cdr.detectChanges();
    this.fetchRealtedData();
    this.cdr.detectChanges();
  }

  onTableDropdownChange(e: any) {
    if(e != null){
      this.selectedTable = e;
      this.fetchRealtedData();
      this.cdr.detectChanges();
    }

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

  onGptModelChange(e: any) {
    this.selectedGPTModel = e.key;
    this.cdr.detectChanges();
  }

  onChatInHistoryClick(chat: any){
    this.currentChatgptResopnse = chat.response;
    
    let colDefs = [];
    colDefs = this.generateColDefsFromJson(this.currentChatgptResopnse.sqlData);
    this.res_columnDefs = colDefs;
    this.res_rowData = this.currentChatgptResopnse.sqlData;
    this.res_gridApi.setColumnDefs(this.columnDefs);
    this.res_gridApi.setRowData(this.rowData);
    const chtData = this.prepareChartData(this.res_rowData);
    this.barChartData = {
      labels: chtData.labels,
      datasets: [{
        label: chtData.prop,
        data: chtData.data,
        backgroundColor: chtData.data.map(() => this.getRandomDarkGradientColor()),
        borderWidth: 1
      }]
    };

    this.pieChartData = {
      labels: chtData.labels,
      datasets: [{
        label: chtData.prop,
        data: chtData.data,
        backgroundColor: chtData.data.map(() => this.getRandomDarkGradientColor()),
        borderWidth: 1
      }]
    };

    if(this.showHistoryDialog)
      this.showHistoryDialog = false;
    
    this.showDialog = true;

    this.cdr.detectChanges();
  }

  fetchRealtedData() {
    if (this.selectedDatabase == 'Titanic') {
      this.httpService.rawGet('api/titanic').subscribe(res => {
        let colDefs = [];
        colDefs = this.generateColDefsFromJson(res);
        this.columnDefs = colDefs;
        this.rowData = res;
        this.gridApi.setColumnDefs(this.columnDefs);
        this.gridApi.setRowData(this.rowData);
      });
    } else if(this.selectedDatabase == 'Employee') {
      this.httpService.rawPost('api/employees', { tableName: this.selectedTable }).subscribe(res => {
        let colDefs = [];
        colDefs = this.generateColDefsFromJson(res);
        this.columnDefs = colDefs;
        this.rowData = res;
        this.gridApi.setColumnDefs(this.columnDefs);
        this.gridApi.setRowData(this.rowData);
      });
    }else {
      let tableName = '';

      if(this.selectedDatabase == 'Employee2')
        tableName = 'Employee';
      else if(this.selectedDatabase == 'NBA Players')
        tableName = 'players';
      else if(this.selectedDatabase == 'SellingBooks')
        tableName = 'BestSellingBooks';

      this.httpService.rawPost('api/dataq', { tableName , databaseName: this.selectedDatabase }).subscribe(res => {
        let colDefs = [];
        colDefs = this.generateColDefsFromJson(res);
        this.columnDefs = colDefs;
        this.rowData = res;
        this.gridApi.setColumnDefs(this.columnDefs);
        this.gridApi.setRowData(this.rowData);
      });
    }

  }

}

class ChatHistory{
  constructor(public question: string,
    public response: any, public gptModel: string, public database: string){}
}
