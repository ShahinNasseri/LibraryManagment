import { PageSizeSelectorPaginationComponent } from './custom-status-bar-panels/page-size-selector-pagination/page-size-selector-pagination.component';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  CellClickedEvent,
  CellContextMenuEvent,
  CellDoubleClickedEvent,
  CellEditingStoppedEvent,
  CellValueChangedEvent,
  ColDef,
  ColumnApi,
  ExcelStyle,
  FirstDataRenderedEvent,
  GetContextMenuItems,
  GetContextMenuItemsParams,
  GridApi,
  GridReadyEvent,
  IDatasource,
  IRowNode,
  IServerSideDatasource,
  IsRowSelectable,
  MenuItemDef,
  ModelUpdatedEvent,
  PaginationChangedEvent,
  RowClickedEvent,
  RowDataUpdatedEvent,
  RowDoubleClickedEvent,
  RowEditingStoppedEvent,
  RowModelType,
  RowValueChangedEvent,
  SelectionChangedEvent,
  SideBarDef,
  StatusPanelDef,
} from 'ag-grid-community';
import { Observable, Subject, combineLatest, take, lastValueFrom, Subscription } from 'rxjs';
import { sidebarPanel } from './static-data.static';
import { AgGridAngular } from 'ag-grid-angular';

import { CustomBooleanFilter } from './custom-filters/custom-boolean-filter';
import { CheckboxCellRenderComponent } from './custom-render-components/checkbox-cell-render/checkbox-cell-render.component';
import { AggregationStatusBarComponent } from './custom-status-bar-panels/aggregation-status-bar/aggregation-status-bar.component';
import { AgGridLocalService } from './services/ag-grid-local.service';
import { PageSummeryStatusBarComponent } from './custom-status-bar-panels/page-summery-status-bar/page-summery-status-bar.component';
import { PaginationStatusBarComponent } from './custom-status-bar-panels/pagination-status-bar/pagination-status-bar.component';
import { BooleanCellRenderComponent } from './custom-render-components/boolean-cell-render/boolean-cell-render.component';
import { AlertService, AlertType } from '@core/general/services/alert.service';
import { ApiBaseService } from '@core/general/services/api-base.service';
import { ApiResponse } from '@core/general/models/api-response.model';
import { ToolsService } from '@core/general/services/tools.service';

@Component({
  selector: 'fs-ag-grid',
  templateUrl: './fs-ag-grid.component.html',
  styleUrls: ['./fs-ag-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AgGridLocalService],
})
export class FsAgGridComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('grid', { static: false }) grid: AgGridAngular | undefined;

  private gridApi: GridApi | undefined;
  private columnApi: ColumnApi | undefined;

  changeDataSource$: Subject<any> = new Subject<any>();
  readyToChangeDataSource$: Observable<any> | undefined;
  gridReady$: Observable<any> | undefined;

  lastChangeDataSourceModel: ChangeDataSource = {
    loadAllData: true,
    model: {},
    routingAction: '',
  };

  private apiBase: ApiBaseService = inject(ApiBaseService);
  private injector: Injector = inject(Injector);
  private _localService: AgGridLocalService = inject(AgGridLocalService);

  private fsToolsService: ToolsService = inject(ToolsService);
  private alertService: AlertService = inject(AlertService);

  parentComponentName: string | undefined;

  initalColumnDefs: any;

  components = {
    CustomBooleanFilter,
    CheckboxCellRenderComponent,
    BooleanRenderComponent: BooleanCellRenderComponent,
    PageSizeSelectorPaginationComponent,
    AggregationStatusBarComponent,
  };

  @Input() id: string | undefined;

  @Input() keyExpr = 'id';
  @Input() parentKeyExpr = 'parentId';
  @Input() treeDisplayExpr = 'name';

  @Input() disableCheckboxExpr?: string = undefined;

  @Input() disableCheckboxConditionCheck?: any = false;

  @Input() activeCheckboxExpr?: string = undefined;

  @Input() activeCheckboxConditionCheck?: any = true;

  @Input() columnDefs: ColDef[] | undefined;

  @Input() autoGroupColumnDef: ColDef | undefined;

  @Input() defaultColDef: ColDef | undefined;

  @Input() rowData: any[] = [];

  @Input() rowSelection: 'single' | 'multiple' | undefined = 'multiple';

  @Input() suppressRowClickSelection: boolean = false;

  @Input() rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' | undefined;

  // if set to true it will not show the custom pagination panel
  @Input() suppressCustomPaginationPanel: boolean = false;

  @Input() statusBar:
    | {
        statusPanels: StatusPanelDef[];
      }
    | undefined;

  @Input() suppressDragLeaveHidesColumns: boolean = true;

  /* Set to true to allow multiple rows to be selected with clicks.
   * For example, if you click to select one row and then click to select another row,
   * the first row will stay selected as well. Clicking a selected row in this mode will deselect the row.
   * This is useful for touch devices where Ctrl and Shift clicking is not an option.
   */
  @Input() rowMultiSelectWithClick: boolean = false;

  @Input() pagination: boolean = true;

  @Input() paginationPageSize: number = 10;

  @Input() rowModelType: RowModelType | undefined = 'serverSide'; // 'serverSide' : 'infinite' : 'clientSide'

  @Input() serverSideDatasource: IServerSideDatasource | undefined;

  @Input() sideBar: SideBarDef = sidebarPanel;

  @Input() enableRtl: boolean = true;

  @Input() animateRows: boolean = true;

  @Input() maxBlocksInCache: number = 0; // 0 means disable buffering in ag-grid

  @Input() rowHeight: number = 25;

  @Input() headerHeight: number = 40;

  @Input() enableRangeSelection: boolean = true;

  // enables undo / redo
  @Input() undoRedoCellEditing: boolean = true;

  @Input() enableFillHandle: boolean = false;

  @Input() undoRedoCellEditingLimit: number = 20;

  @Input() cacheOverflowSize: number = 0;

  // enables flashing to help see cell changes
  @Input() enableCellChangeFlash: boolean = true;

  @Input() groupSelectsChildren: boolean = false;

  @Input() groupDefaultExpanded: number | undefined = undefined; //-1 means expand all

  @Input() suppressClickEdit: boolean = false;

  /** Set to `'fullRow'` to enable Full Row Editing. Otherwise leave null to edit one cell at a time.     */
  @Input() editType: 'fullRow' | undefined = 'fullRow';

  /** Set to `true` so stop the grid updating data after and edit. When this is set, it is intended the application will update the data, eg in an external immutable store, and then pass the new dataset to the grid.     */
  @Input() readOnlyEdit: boolean = false;

  @Input() singleClickEdit: boolean = false;

  //Checkbox selection can be used in two places: row selection and group selection.
  @Input() checkboxSelection: boolean = false;

  @Input() treeData: boolean = false;

  @Input() excelStyles: ExcelStyle[] | undefined;
  @Input() hasExcelExport: boolean = true;
  @Input() haschartExport: boolean = true;
  // [
  //   { id: 'fanus-default', alignment: { readingOrder: 'RightToLeft' } },
  // ];

  contextMenuMultiItemsValue: MenuItemDef[] | MenuItemDefExtra[] = [];
  @Input() get contextMenuMultiItems() {
    return this.contextMenuMultiItemsValue;
  }

  set contextMenuMultiItems(val: MenuItemDef[] | MenuItemDefExtra[]) {
    this.contextMenuMultiItemsValue = val;
    this.cdr.detectChanges();
  }

  contextMenuItemsValue: MenuItemDef[] | MenuItemDefExtra[] = [];
  @Input() get contextMenuItems() {
    return this.contextMenuItemsValue;
  }

  set contextMenuItems(val: MenuItemDefExtra[]) {
    const items: any = [];

    for (let index = 0; index < val.length; index++) {
      const item = val[index];
      switch (item.type?.toLocaleLowerCase()) {
        case 'edit':
          items.push(this.addEditItem(item));
          break;
        case 'insert':
          items.push(this.addInsertItem(item));
          break;
        case 'delete':
          items.push(this.addDeleteItem(item));
          break;

        case 'toggleisactive':
          items.push(this.addToggleIsActiveItem(item));
          break;

        case 'restore':
          items.push(this.addRestoreItem(item));
          break;
        default:
          items.push(item);
          break;
      }
    }

    this.contextMenuItemsValue = items;
    this.cdr.detectChanges();
  }

  // if set to true ths pagination status bar will remove
  @Input() suppressPaginationPanel: boolean = true;

  @Input() suppressExtraContextMenuItems: boolean = false; //این کاستوم خودمونه اگر مقدارش ترو بشه گزینه های اضافی کانتکس منو رو نمایش نمیده

  @Input() getContextMenuItems: GetContextMenuItems<any> = (
    params: GetContextMenuItemsParams
  ): (string | MenuItemDef)[] => {
    this.currentContextParamsChanged.emit(params);

    if (params.node == null) return [''];

    const result: any[] = [];

    let hasMultiItem: boolean = false;
    if (
      this.gridApi!.getSelectedRows().length > 1 &&
      this.contextMenuMultiItemsValue != null &&
      this.contextMenuMultiItemsValue.length > 0
    )
      hasMultiItem = true;

    // Helper function to bind params to action
    const bindParamsToAction = (
      action: (params: GetContextMenuItemsParams) => void,
      params: GetContextMenuItemsParams
    ): (() => void) => {
      return () => action(params);
    };

    const contextMenuItemCopy = this.fsToolsService.deepCopy(this.contextMenuItemsValue);
    for (let i = 0; i < contextMenuItemCopy.length; i++) {
      const ignore = contextMenuItemCopy[i].ignore ? contextMenuItemCopy[i].ignore(params) : false;
      if (ignore) continue;

      const menuItem = contextMenuItemCopy[i];
      menuItem.name = hasMultiItem ? menuItem.name + ' - (Current Item)' : menuItem.name;
      const action: any = menuItem.action;
      menuItem.action = bindParamsToAction(action, params);
      result.push(menuItem);
    }

    const contextMenuMultiItemCopy = this.fsToolsService.deepCopy(this.contextMenuMultiItemsValue);
    if (hasMultiItem) {
      result.push('separator');
      for (let index = 0; index < contextMenuMultiItemCopy.length; index++) {
        const menuItem = contextMenuMultiItemCopy[index];
        menuItem.name = hasMultiItem ? menuItem.name + ' - (Selected Items)' : menuItem.name;
        const action: any = menuItem.action;
        menuItem.action = bindParamsToAction(action, params);
        result.push(menuItem);
      }
    }

    // گزینه های نمایش داده شده بعد کپی , 'pivotChart'
    const moreItems = [
      'separator',
      {
        // custom item
        name: 'export excel of all data',
        disabled: false,
        tooltip: 'Excel output regardless of pagination',
        action: () => {
          this.exportAllDataExcel();
          this.cdr.detectChanges();
        },
        icon: '<i style="font-size: 15px" class="fa fa-file-excel-o"></i>',
      },
      'csvExport',
      'excelExport',
    ];
    const chartItem = ['separator', 'chartRange'];

    // گزینه های مربوط به کپی  // 'cut',
    const nonNullColumns = ['separator', 'copy', 'copyWithHeaders', 'copyWithGroupHeaders'];

    // خلاصه اش اینجا داریم میگیم اگه اون سلول کلیک راست کرده مقدار نداشت اون گزینه های مربوط به کپی رو نشون نده اگه داشت نشون بده
    if (params.value == null && this.suppressExtraContextMenuItems == false) {
      if (this.hasExcelExport) result.push(...moreItems);
      if (this.haschartExport) result.push(...chartItem);
    } else if (this.suppressExtraContextMenuItems == false) {
      result.push(...nonNullColumns);
      if (this.hasExcelExport) result.push(...moreItems);
      if (this.haschartExport) result.push(...chartItem);
    }

    return result;
  };

  @Output() gridReady: EventEmitter<GridReadyEvent<any>> = new EventEmitter<GridReadyEvent<any>>();

  @Output() cellClicked: EventEmitter<CellClickedEvent> = new EventEmitter<CellClickedEvent>();

  /*
   *Triggered every time the paging state changes. Some of the most common scenarios for this event to be triggered are:
   The page size changes
   The current shown page is changed
   New data is loaded onto the grid
   * */
  @Output() paginationChanged: EventEmitter<PaginationChangedEvent> =
    new EventEmitter<PaginationChangedEvent>();

  // The client has updated data for the grid by either a) setting new Row Data or b) Applying a Row Transaction.
  @Output() rowDataUpdated: EventEmitter<RowDataUpdatedEvent> =
    new EventEmitter<RowDataUpdatedEvent>();

  // Fired the first time data is rendered into the grid. Use this event if you want to auto resize columns based on their contents
  @Output() firstDataRendered: EventEmitter<FirstDataRenderedEvent> =
    new EventEmitter<FirstDataRenderedEvent>();

  @Output() cellDoubleClicked: EventEmitter<CellDoubleClickedEvent<any>> = new EventEmitter<
    CellDoubleClickedEvent<any>
  >();
  // Row is clicked.
  @Output() rowClicked: EventEmitter<RowClickedEvent> = new EventEmitter<RowClickedEvent>();

  // Row is double clicked.
  @Output() rowDoubleClicked: EventEmitter<RowDoubleClickedEvent> =
    new EventEmitter<RowDoubleClickedEvent>();

  // Cell is right clicked.
  @Output() cellContextMenu: EventEmitter<CellContextMenuEvent> =
    new EventEmitter<CellContextMenuEvent>();

  @Output() selectionChanged: EventEmitter<{
    data: any[];
    event: SelectionChangedEvent;
    isChangedByUser: boolean;
  }> = new EventEmitter<{
    data: any[];
    event: SelectionChangedEvent;
    isChangedByUser: boolean;
  }>();

  @Output() cellValueChanged: EventEmitter<CellValueChangedEvent<any>> = new EventEmitter<
    CellValueChangedEvent<any>
  >();

  @Output() rowValueChanged: EventEmitter<RowValueChangedEvent<any>> = new EventEmitter<
    RowValueChangedEvent<any>
  >();

  @Output() cellEditingStopped: EventEmitter<CellEditingStoppedEvent<any>> = new EventEmitter<
    CellEditingStoppedEvent<any>
  >();

  @Output() rowEditingStopped: EventEmitter<RowEditingStoppedEvent<any>> = new EventEmitter<
    RowEditingStoppedEvent<any>
  >();

  @Output() modelUpdated: EventEmitter<ModelUpdatedEvent<any>> = new EventEmitter<
    ModelUpdatedEvent<any>
  >();

  @Output() dataSourceChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() currentContextParamsChanged: EventEmitter<any> =
    new EventEmitter<GetContextMenuItemsParams>();

  private apiBaseService: ApiBaseService | undefined;

  subscriptions: Subscription[] = [];
  constructor(private readonly cdr: ChangeDetectorRef) {}

  showGrid: boolean = false;

  ngOnInit(): void {
    this.apiBaseService = this.apiBase;
  }

  ngAfterViewInit(): void {
    this.componentLevelLogicForInitial();
    this.getParentComponentName();
    this.initialObservable();
    this.handleSubscribers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscriber => {
      subscriber.unsubscribe();
    });
  }

  private componentLevelLogicForInitial() {
    if (this.treeData == true) {
      this.getDataPath = (data: any) => {
        return data.path;
      };
    }

    this.statusBar =
      this.suppressCustomPaginationPanel == false
        ? {
            statusPanels: [
              {
                statusPanel: PageSizeSelectorPaginationComponent,
                align: 'left',
                statusPanelParams: {
                  pageSizeOptions: [10, 20, 50, 100],
                  title: 'اندازه صفحه',
                },
              },
              {
                statusPanel: PageSummeryStatusBarComponent,
                align: 'left',
              },
              {
                statusPanel: PaginationStatusBarComponent,
                align: 'left',
              },
            ],
          }
        : undefined;

    this.showGrid = true;

    this.cdr.detectChanges();
  }

  public getDataPath: any = undefined;

  private convertDataToTreeList(data: any) {
    data.map((i: any) => {
      i.path = [];
      if (i[this.parentKeyExpr]) {
        i.path.push(i[this.treeDisplayExpr]);
        this.getParentLoop(i[this.parentKeyExpr], i.path, data);
      } else {
        i.path.push(i[this.treeDisplayExpr]);
      }
      return i;
    });
    return data;
  }

  private getParentLoop(fieldId: any, path: any, data: any[]): any {
    const p = data.find(a => a[this.keyExpr] == fieldId);
    if (p[this.parentKeyExpr]) {
      path.unshift(p[this.treeDisplayExpr]);
      return this.getParentLoop(p[this.parentKeyExpr], path, data);
    } else {
      path.unshift(p[this.treeDisplayExpr]);
    }
    return path;
  }

  private getParentComponentName(): void {
    const injct: any = this.injector;
    if (injct._lView[0] != null) {
      this.parentComponentName = injct._lView[0].tagName;
    } else if (injct._tNode.tView_.node.tView_.viewQuery.name != null) {
      this.parentComponentName = injct._tNode.tView_.node.tView_.viewQuery.name.split('_')[0];
    }
  }

  private handleSubscribers() {
    this.subscriptions.push(
      this.readyToChangeDataSource$!.subscribe((v: any) => {
        this.changeDataSourceProcess();
      })
    );
  }

  cellContextMenuExtra(e: any) {
    this.cellContextMenu.emit(e);
    //Handler (select on right click if only one row is already selected for better ux)
    if (this.gridApi!.getSelectedRows().length <= 1) {
      this.gridApi!.deselectAll();
      e.node.setSelected();
    }
  }

  private initialObservable() {
    this.gridReady$ = this.grid!.gridReady.asObservable();
    this.readyToChangeDataSource$ = combineLatest(this.gridReady$, this.changeDataSource$);
  }

  selectionChangedByUser: boolean = false;
  onlySelectGivenItems(selectedItems: any[]) {
    this.selectionChangedByUser = true;
    this.gridApi!.forEachNode(node =>
      selectedItems.includes(node.data[this.keyExpr])
        ? node.setSelected(true)
        : node.setSelected(false)
    );
  }

  selectAll() {
    this.gridApi!.selectAll();
  }

  deSelectAll() {
    this.deSelectAll();
  }

  getSelectedRowData() {
    const selectedData = this.gridApi!.getSelectedRows();
    return selectedData;
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedData = this.gridApi!.getSelectedRows();
    const newEvent = {
      data: selectedData,
      event,
      isChangedByUser: this.selectionChangedByUser,
    };
    this.selectionChanged.emit(newEvent);
    this.selectionChangedByUser = false;
  }

  gridReadyExtra(e: GridReadyEvent<any>) {
    this.gridApi = e.api;
    this.columnApi = e.columnApi;
    e.api.sizeColumnsToFit();
    this.gridReady.emit(e);
    this.cdr.detectChanges();
  }

  public clearFilters() {
    this.gridApi!.setFilterModel(null);
    this.gridApi!.onFilterChanged();
  }

  public changeDataSource(cds: ChangeDataSource): void {
    this.lastChangeDataSourceModel = {
      model: cds.model,
      routingAction: cds.routingAction,
      loadAllData: cds.loadAllData ?? true,
    };
    this.changeDataSource$.next(true);
  }

  public exportAgPdf() {
    // exportPdf(this.gridApi, this.columnApi);
  }

  public setData(data: any) {
    if (this.treeData == true) {
      data = this.convertDataToTreeList(data);
    }

    this.rowData = data;
    this.cdr.detectChanges();
  }

  public firstDataRenderedExtra(params: FirstDataRenderedEvent) {
    this.firstDataRendered.emit(params);

    if (this.activeCheckboxExpr == null) return;

    const nodesToSelect: any[] = [];
    params.api.forEachNode(node => {
      if (node.data && node.data[this.activeCheckboxExpr!] == this.activeCheckboxConditionCheck) {
        nodesToSelect.push(node);
      }
    });

    params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
    this.cdr.detectChanges();
  }

  public isRowSelectable: IsRowSelectable = (params: IRowNode<any>) => {
    if (params.data == null) {
      return false;
    }

    if (this.disableCheckboxExpr == null) {
      return true;
    }

    const isRowSelectable =
      params.data[this.disableCheckboxExpr] == this.disableCheckboxConditionCheck;

    if (isRowSelectable) {
      return false;
    }

    return true;
  };

  private async changeDataSourceProcess() {
    if (this.rowModelType == 'infinite') {
      this.loadInInfinite();
    } else if (this.lastChangeDataSourceModel.loadAllData) {
      await this.loadInClientSide();
    } else {
      this.loadInServerSide();
    }
    this.cdr.detectChanges();
  }

  private async loadInClientSide() {
    const res = await lastValueFrom(
      this.apiBaseService!.post<ApiResponse<any>>(
        this.lastChangeDataSourceModel.routingAction,
        this.lastChangeDataSourceModel.model
      )
    );

    if (res.statusCode == 0) {
      return;
    }

    const data = res.data ?? [];
    const totalCount = data[0].totalCount;
    this.rowData = data;
    this.dataSourceChange.emit(data);
  }

  private loadInInfinite() {
    const dt: IDatasource = {
      getRows: params => {
        this.lastChangeDataSourceModel.model = this.addPaginationAndSortOrderToModelInfinite(
          this.lastChangeDataSourceModel.model,
          params
        );

        lastValueFrom(
          this.apiBaseService!.post<ApiResponse>(
            this.lastChangeDataSourceModel.routingAction,
            this.lastChangeDataSourceModel.model
          )
        )
          .then((res: ApiResponse) => {
            if (res.statusCode == 0) {
              params.failCallback();
              return;
            }

            const data = res.data ?? [];
            const totalCount = data[0].totalCount;

            let lastRow = -1;
            if (data.length <= params.endRow) {
              lastRow = data.length;
            }

            params.successCallback(data, totalCount);
            this.dataSourceChange.emit(data);
          })
          .catch(() => {
            params.failCallback();
          });
      },
    };
    this.gridApi!.setDatasource(dt);
  }

  private loadInServerSide() {
    const dtServerSide: IServerSideDatasource = {
      getRows: params => {
        // console.log(params);
        this.lastChangeDataSourceModel.model = this.addPaginationAndSortOrderToModelServerSide(
          this.lastChangeDataSourceModel.model,
          params,
          this.lastChangeDataSourceModel.loadAllData
        );

        lastValueFrom(
          this.apiBaseService!.post<ApiResponse>(
            this.lastChangeDataSourceModel.routingAction,
            this.lastChangeDataSourceModel.model
          )
        )
          .then((res: ApiResponse) => {
            if (res.statusCode == 0) {
              params.fail();
              return;
            }

            let data = res.data;

            if (data != null) {
              const totalCount = data[0].totalCount;
              if (this.treeData == true) data = this.convertDataToTreeList(data);
              params.success({ rowData: data ?? [], rowCount: totalCount });
            } else {
              params.success({ rowData: [], rowCount: 0 });
            }
            this.dataSourceChange.emit(data);
          })
          .catch(() => {
            params.fail();
          });
      },
    };
    this.serverSideDatasource = dtServerSide;
  }

  private addPaginationAndSortOrderToModelServerSide(
    model: any,
    params: any,
    loadAllData: boolean
  ) {
    if (loadAllData == false) {
      const pageSize = this.paginationPageSize;
      const pageIndex = Math.floor(params.request.startRow / pageSize);

      model.pageIndex = pageIndex;
      model.pageSize = pageSize;
    } else {
      model.pageIndex = null;
      model.pageSize = null;
    }

    model.dynamicFilter = JSON.stringify(params.request.filterModel);
    if (params.request.sortModel.length > 0) {
      model.sortOrder = params.request.sortModel[0].sort.toLowerCase() == 'asc' ? 1 : 2;
      model.orderByColumn = params.request.sortModel[0].colId;
    } else {
      model.sortOrder = 1;
      model.orderByColumn = this.keyExpr;
    }

    return model;
  }

  private addPaginationAndSortOrderToModelInfinite(model: any, params: any) {
    const pageIndex = this.gridApi!.paginationGetCurrentPage();
    const pageSize = this.paginationPageSize;

    model.pageIndex = pageIndex;
    model.pageSize = pageSize;
    model.filter = JSON.stringify(params.filterModel);
    if (params.sortModel.length > 0) {
      model.sortOrder = params.sortModel[0].sort;
      model.orderByColumn = params.sortModel[0].colId;
    } else {
      model.sortOrder = 1;
      model.orderByColumn = this.keyExpr;
    }
    return model;
  }

  public rowClickedExtra(params: any) {
    this.rowClicked.emit(params);
  }

  public exportAllDataExcel() {
    this.changeDataSource(this.lastChangeDataSourceModel);
    this.dataSourceChange
      .asObservable()
      .pipe(take(1))
      .subscribe(e => {
        this.gridApi!.exportDataAsExcel({
          exportedRows: 'all',
          allColumns: true,
          processCellCallback: params => {
            const cellRenderer = params.column.getColDef().cellRenderer;
            if (cellRenderer && typeof cellRenderer == 'function') {
              // Instantiate the component and get the rendered value
              const componentInstance = new cellRenderer();
              componentInstance.agInit(params);
              return componentInstance.setValueToDisplay(params);
            }
            return params.value;
          },
        });
      });
  }

  public refreshGrid() {
    if (this.gridApi == null) return;

    if (this.rowModelType == 'serverSide') {
      this.gridApi.refreshServerSide();
    } else {
      //this.gridApi.refreshClientSideRowModel();
      this.changeDataSourceProcess();
    }
  }

  private addEditItem(item: any) {
    return {
      name: item.name ?? 'Edit',
      icon:
        item.icon ??
        '<i style="font-size:15px;padding-top: 5px;" class="dx-icon-edittableheader"></i>',
      action: item.action,
    };
  }
  private addInsertItem(item: any) {
    return {
      name: item.name ?? 'Insert',
      icon:
        item.icon ??
        '<i style="font-size:15px;padding-top: 5px;color:green" class="dx-icon-plus"></i>',
      action: item.action,
    };
  }
  private addDeleteItem(item: any) {
    return {
      name: item.name ?? 'Delete',
      icon:
        item.icon ??
        '<i style="font-size:15px;padding-top: 5px;color:red" class="dx-icon-deleterow"></i>',
      action: item.action,
    };
  }
  private addToggleIsActiveItem(item: any) {
    return {
      name: item.name ?? 'Change State ( Active / DeActive )',
      icon:
        item.icon ??
        '<i style="font-size:15px;padding-top: 5px;color:#2196f3" class="dx-icon-checklist"></i>',
      action: item.action,
    };
  }
  private addRestoreItem(item: any) {
    return {
      name: item.name ?? 'Restore',
      icon:
        item.icon ??
        '<i style="font-size:15px;padding-top: 5px;color:#2196f3" class="dx-icon-return"></i>',
      action: item.action,
    };
  }
}

export type ChangeDataSource = {
  model: any;
  routingAction: string;
  loadAllData: boolean;
};

export class MenuItemDefExtra {
  type?: string;
  subMenu?: (string | MenuItemDef)[] | undefined;
  name?: string;
  disabled?: boolean | undefined;
  shortcut?: string | undefined;
  action?: ((e: GetContextMenuItemsParams) => void) | undefined;
  ignore?: ((e: GetContextMenuItemsParams) => boolean) | undefined;
  checked?: boolean | undefined;
  icon?: string | Element | undefined;
  cssClasses?: string[] | undefined;
  tooltip?: string | undefined;
}
