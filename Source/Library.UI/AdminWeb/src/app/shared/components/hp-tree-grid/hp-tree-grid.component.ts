import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ApiResponse, HttpService } from '@core/ai/http.service';
import { MenuItem } from 'primeng/api';
import { TreeNode } from 'primeng/api';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'hp-tree-grid',
  templateUrl: './hp-tree-grid.component.html',
  styleUrls: ['./hp-tree-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HpTreeGridComponent implements OnInit {

  Console = console;

  @Input() paginator: boolean = true;
  @Input() lazy: boolean = true;
  @Input() columns: TreeGridColumnsType[] = [];
  @Input() selectedItems: any[] = [];
  @Input() pageSize: number = 10;
  @Input() dataSource: TreeNode[] = [];
  @Input() rowHover: boolean = true;
  @Input() listModel: any = {};
  @Input() listUrl: string = '';
  @Input() dataKey: string = 'id';
  @Input() hasChildField: string = 'hasChildren';
  @Input() parentIdField: string = 'parentId';
  @Input() resizableColumns: boolean = true;
  @Input() menuItems: MenuItem[] = [];


  @Output() contextMenuSelection: EventEmitter<any> = new EventEmitter<any>();
  @Output() loadNodes: EventEmitter<any> = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onNodeExpand: EventEmitter<any> = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelectAllChange: EventEmitter<any> = new EventEmitter<any>();



  selectedNode: TreeNode = {};
  totalCount: number = 0;
  loading: boolean = false;
  selectAll: boolean = false;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly httpService: HttpService,
  ) { }

  ngOnInit(): void {
    if (this.dataKey == '' || this.dataKey == null) {
      throw new Error('id is not define in hp-tree-grid');
    }

    if (this.hasChildField == '' || this.hasChildField == null) {
      throw new Error('hasChildField is not define in hp-tree-grid');
    }
  }

  get selectedItemsIdsArray() {
    return this.selectedItems.map(item => { return item.data[this.dataKey]; });
  }

  get selectedItemsIdsString() {
    return this.selectedItemsIdsArray.join(',');
  }

  rowTrackBy = (item: any, index: any) => { return item[this.dataKey]; };

  //onSelectionChangeExtra(value = []) {
  //  this.onSelectionChange.emit(value);
  //  this.selectAll = value.length === this.dataSource.length;
  //  this.selectedItems = value;
  //  this.cdr.detectChanges();
  //}


  //onSelectAllChangeExtra(event: any) {
  //  this.onSelectAllChange.emit(event);
  //  const checked = event.checked;

  //  if (checked) {
  //    this.selectedItems = JSON.parse(JSON.stringify(this.dataSource));
  //    this.selectAll = true;
  //    this.cdr.detectChanges();
  //  }
  //  else {
  //    this.selectedItems = [];
  //    this.selectAll = false;
  //    this.cdr.detectChanges();
  //  }
  //}


  async loadNodesExtra(event: any) {
    this.loadNodes.emit(event);
    this.loading = true;
    this.cdr.detectChanges();


    if (event.sortOrder == 1) {
      this.listModel.sortOrder = 'asc';
    } else {
      this.listModel.sortOrder = 'desc';
    }


    this.listModel.orderByColumn = event.sortField ?? this.dataKey;
    this.listModel.pageIndex = event.first;
    this.listModel.pageSize = this.pageSize;


    const res = await lastValueFrom(
      this.httpService.post<any[]>(this.listUrl, this.listModel)).finally(() => {
      this.loading = false;
      this.cdr.detectChanges();
    });

    this.dataSource = [];
    if (res.data != null) {
      for (let i = 0; i < res.data.length; i++) {
        const leaf: any = (res.data[i][this.hasChildField] == true ? false : true);
        const node: TreeNode = { data: res.data[i], leaf, partialSelected: false };
        this.dataSource.push(node);
      }
    }


    if (res.data) {
      this.totalCount = res.data[0].totalCount;
    } else {
      this.totalCount = 0;
    }


    this.loading = false;
    this.cdr.detectChanges();
  }

  async onNodeExpandExtra(event: any) {
    this.onNodeExpand.emit(event);
    this.showLoading();

    if (this.isLoadedCurrentChildBefore(event)) {
      this.dataSource = [...this.dataSource];
      this.hideLoading();
      return;
    }

    const sendModel = this.createSendModel(event.node.data[this.dataKey]);
    const res = await this.getChildrenData(sendModel);

    const resData = this.getStructuredResult(res);

    event.node.children = resData;
    this.dataSource = [...this.dataSource];

    this.hideLoading();
  }


  private getStructuredResult(res: ApiResponse<any[]>) {
    const resData = [];
    if (res.data != null) {
      for (let i = 0; i < res.data.length; i++) {
        const leaf: any = (res.data[i][this.hasChildField] == true ? false : true);
        const node: TreeNode = { data: res.data[i], leaf, partialSelected: false };
        resData.push(node);
      }
    }
    return resData;


  }

  private isLoadedCurrentChildBefore(event: any) {
    return event.node.children != null;
  }

  private createSendModel(nodeId: any): any {
    const sendModel = JSON.parse(JSON.stringify(this.listModel));
    sendModel.pageIndex = 0;
    sendModel.pageSize = 1000;
    sendModel.orderByColumn = this.dataKey;
    sendModel.sortOrder = 'asc';
    sendModel[this.parentIdField] = nodeId;

    return sendModel;
  }

  private async getChildrenData(sendModel: any) {
    return await lastValueFrom(
      this.httpService.post<any[]>(this.listUrl, sendModel)).finally(() => {
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  private hideLoading() {
    this.loading = false;
    this.cdr.detectChanges();
  }

  private showLoading() {
    this.loading = true;
    this.cdr.detectChanges();
  }
}

//export interface TreeNode {
//  data?: any;
//  children?: TreeNode[];
//  leaf?: boolean;
//  expanded?: boolean;
//  partialSelected?: boolean;
//}

export class TreeGridColumnsType {
  constructor(public field: string = '', public header: string = '', public type: string = 'text', public width?: string) {
    this.field = field;
    this.header = header;
    this.type = type;
    this.width = width ?? '100';
  }
}
