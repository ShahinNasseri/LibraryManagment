import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, AfterViewInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpService } from '@core/ai/http.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { UserDefinedElement } from 'devextreme/core/element';
import { LoadOptions } from 'devextreme/data';
import CustomStore, { ResolvedData } from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { ColumnBase, ColumnResizeMode, DragDirection, DragHighlight } from 'devextreme/ui/data_grid';
import { lastValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'hp-dx-data-grid',
  templateUrl: './hp-dx-data-grid.component.html',
  styleUrls: ['./hp-dx-data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HpDxDataGridComponent implements OnInit, AfterViewInit {
  @ViewChild('element', { static: true }) dataGrid?: DxDataGridComponent;

  activeShortcutKey: boolean = false;

  private column?: any[];

  selectedItemsColumn: any[] = [];

  contextRightClickData: any;
  contextRightClickItemData: any;

  thisControlerHasNoConfig: boolean = true;

  excelExportTooltipOption: any;

  subscription: Subscription[] = [];

  dataForCopy?: string;

  contextMenuDataSource: any[] = [{ html: '<i class=\'icon fa-icon-copy fa-menuActionItem main-font-size-1\'><span class=\'fa-menuActionTitle main-font-size-1\'>کپی</span></i>', id: 'copyClipboard' }];

  useHtml: boolean = false;

  changeDataSourceValue: any;

  constructor(
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    try {
      if (this.dataSourceModel != null)
        this.dataSource = this.dataSourceWithPaginig(this.dataSourceModel);

      this.setScroll();
      this.onAfterViewInit.emit();
      this.cdr.detectChanges();
    } catch (e) {
      console.log(e);
    }

  }


  counter: number = 0;


  onContextMenuPreparing(e: any): void {
    // یعنی فقط زمانی اجرا شو که روی بدنه کلیک راست شده است
    if (e.target == 'content') {
      this.contextMenuDataSource = [{ html: '<i class=\'icon fa-icon-copy fa-menuActionItem main-font-size-1\'><span class=\'fa-menuActionTitle main-font-size-1\'>کپی</span></i>', id: 'copyClipboard' }];
      if (this.operationColumnMenuItem != null) {
        const operationMenu = JSON.parse(JSON.stringify(this.operationColumnMenuItem));
        if (e.row == null) {
          this.contextMenuDataSource = [];
          for (let i = 0; i < operationMenu[0].items.length; i++) {
            if (operationMenu[0].items[i].isHideWhenNullData == true)
              operationMenu[0].items[i].visible = false;
          }
        }
        this.contextMenuDataSource = this.contextMenuDataSource.concat(operationMenu[0].items);
      }

      if (e.column != null && e.column.dataField != null) {
        const col = e.column.dataField;
        this.contextRightClickData = e.row.data[col];
        this.contextRightClickItemData = e.row.data;
      }

    }
  }

  onContextMenuGridClick(e: any): void {
    if (e.itemData.id == 'copyClipboard') {
      navigator.clipboard.writeText(this.contextRightClickData).then(function () {
      }.bind(this), function (err: any) {

      }.bind(this));
    }

    const object = {
      e, i: { data: this.contextRightClickItemData }
    };

    this.onClickOperationItem.emit(object);
  }

  getSelectedRowsData<T>(): T[] { return this.dataGrid!.instance.getSelectedRowsData(); }


  @Input() isShowLoading: boolean = false;

  @Input()
  ngModel: any;


  @Input()
  ngModelOptions?: any;
  @Output() ngModelOptionsChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  style: string = '';

  @Input() conditions?: Conditions[];

  @Input() canExportExcel: boolean = false;

  @Input()
  name: string = '';

  @Input() id: string = '';

  // Specifies the shortcut key that sets focus on the widget.
  @Input()
  accessKey: string = `id`;
  // Specifies whether a user can reorder columns.
  @Input()
  allowColumnReordering: boolean = true;
  // Specifies whether a user can resize columns.
  @Input()
  allowColumnResizing: boolean = true;
  // Specifies whether data should be cached.
  @Input()
  cacheEnabled: boolean = false;
  // Enables a hint that appears when a user hovers the mouse pointer over a cell with truncated content.
  @Input()
  cellHintEnabled: boolean = true;

  columnAutoWidthValue: boolean = true;
  // Specifies whether columns should adjust their widths to the content.
  @Input()
  get columnAutoWidth() {
    return this.columnAutoWidthValue;
  }

  set columnAutoWidth(val: boolean) {
    this.columnAutoWidthValue = val;
  }

  // Configures the column chooser.
  @Input()
  columnChooser: object = {
    allowSearch: false,
    emptyPanelText: 'برای پنهان کردن ستون به اینجا درگ کنید.',
    enabled: false,
    height: 260,
    mode: 'dragAndDrop',
    searchTimeout: 500,
    title: 'انتخاب ستون',
    width: 250
  };
  // Configures column fixing. 
  @Input()
  columnFixing: object = {
    enabled: false,
    texts: {
      fix: `ثابت کردن`,
      leftPosition: `ثابت کردن در چپ جدول`,
      rightPosition: `ثابت کردن در راست جدول`,
      unfix: `غیر ثابت کردن`
    },
  };
  // Specifies whether the widget should hide columns to adapt to the screen or container size. Ignored if  is <strong>true</strong> and  is <em>"widget"</em>.
  @Input()
  columnHidingEnabled: boolean = false;
  // Specifies the minimum width of columns.
  //@Input()
  //columnMinWidth: number = undefined;
  // Specifies how the widget resizes columns. Applies only if  is <strong>true</strong>.
  @Input()
  columnResizingMode: ColumnResizeMode = 'widget';//'nextColumn';
  // An array of grid columns.
  @Input()
  columns: ColumnBase<any>[] | any[] = [];
  // Specifies the width for all . Has a lower priority than the <strong>column</strong>. option.
  //@Input()
  //columnWidth: number = undefined;
  // Specifies a function that customizes grid columns after they are created.
  //@Input()
  //customizeColumns: any = null;
  // Customizes data before export. You can use the <strong>exporting</strong>. function instead.
  //@Input()
  //customizeExportData: any = null;
  // Specifies the origin of data for the widget.
  @Input()
  dataSource: any = null;

  // Specifies whether the widget responds to user interaction.
  @Input()
  disabled: boolean = false;
  // Configures editing.
  @Input()
  editing: object = {
    allowAdding: false,
    allowDeleting: false,
    allowUpdating: false,
    form: null,
    mode: 'row',
    popup: null,
    refreshMode: 'full',
    texts: {},
    useIcons: false
  };
  // Specifies the  to be attached to the widget's root element.
  @Input()
  elementAttr: object = {};
  // Indicates whether to show the error row.
  @Input()
  errorRowEnabled: boolean = true;
  // Configures client-side exporting.
  @Input()
  export: object = {
    allowExportSelectedData: true,
    customizeExcelCell: null,
    enabled: false,
    excelFilterEnabled: false,
    excelWrapTextEnabled: undefined,
    fileName: 'DataGrid',
    ignoreExcelErrors: true,
    proxyUrl: undefined,
    texts: {
      exportAll: 'استخراج تمامی آیتم ها',
      exportSelectedRows: 'استخراج آیتم های انتخاب شده ',
      exportTo: 'خروجی excel'
    },
  };
  // Configures the integrated filter builder.
  //@Input()
  //filterBuilder: object = {};
  // Configures the popup in which the integrated  is shown.
  //@Input()
  //filterBuilderPopup: object = {};
  // Configures the filter panel.

  // Specifies whether to synchronize the , , and . The synchronized filter expression is stored in the  option.
  //@Input()
  //filterSyncEnabled: boolean = null;
  // Specifies a filter expression.         
  //@Input()
  //filterValue: object = null;
  // Specifies the index of the column focused initially or currently in the data row area.
  //@Input()
  //focusedColumnIndex: number = null;
  // Specifies whether the focused row feature is enabled.
  @Input()
  focusedRowEnabled: boolean = true;
  // Specifies the initially or currently focused grid row's index. Use it when  is <strong>true</strong>.
  //@Input()
  //focusedRowIndex: number = null;
  // Specifies initially or currently focused grid row's key. Use it when  is <strong>true</strong>.
  @Input()
  focusedRowKey: any = 'id';//`id`;
  // Specifies whether the widget can be focused using keyboard navigation.
  @Input()
  focusStateEnabled: boolean = true;
  // Configures grouping. 
  @Input()
  grouping: object = {
    allowCollapsing: true,
    autoExpandAll: true,
    contextMenuEnabled: false,
    expandMode: 'buttonClick',
    texts: {
      groupByThisColumn: 'گروه بندی بر اساس ',
      groupContinuedMessage: 'ادامه این گروه در صفحه قبل',
      groupContinuesMessage: 'ادامه این گروه در صفحه بعد',
      ungroup: 'غیر فعال کردن گروه بندی',
      ungroupAll: 'غیر فعال کردن گروه بندی کل',
    }
  };

  // PeymanMH
  isShowGroupPanelValue: boolean = false;
  @Input()
  get isShowGroupPanel() {
    return this.isShowGroupPanelValue;
  }

  set isShowGroupPanel(val: boolean) {
    this.isShowGroupPanelValue = val;
    this.groupPanel = {
      allowColumnDragging: true,
      emptyPanelText: 'برای گروه بندی عنوان ستون مورد نظر را به اینجا درگ کنید.',
      visible: this.isShowGroupPanelValue
    };
  }

  // Configures the .  
  @Input()
  groupPanel: object = {
    allowColumnDragging: true,
    emptyPanelText: 'برای گروه بندی عنوان ستون مورد نظر را به اینجا درگ کنید.',
    visible: false
  };

  // PeymanMH
  isShowFilterValue: boolean = false;
  @Input()
  get isShowFilter() {
    return this.isShowFilterValue;
  }

  set isShowFilter(val: boolean) {
    this.isShowFilterValue = val;

    this.filterRow = {
      applyFilter: 'auto',
      applyFilterText: 'Apply filter',
      betweenEndText: 'End',
      betweenStartText: 'Start',
      operationDescriptions: {},
      resetOperationText: 'Reset',
      showAllText: '',
      showOperationChooser: true,
      visible: this.isShowFilterValue
    };
  }

  @Input()
  filterPanel: object = {
    customizeText: null,
    filterEnabled: true,
    texts: {},
    visible: false
  };
  // Configures the filter row.
  @Input()
  filterRow: object = {
    applyFilter: 'auto',
    applyFilterText: 'Apply filter',
    betweenEndText: 'End',
    betweenStartText: 'Start',
    operationDescriptions: {},
    resetOperationText: 'Reset',
    showAllText: '',
    showOperationChooser: true,
    visible: this.isShowFilterValue
  };

  // Configures the header filter feature.
  @Input()
  headerFilter: object = {
    allowSearch: false,
    height: 325,
    searchTimeout: 500,
    texts: {},
    visible: false,
    width: 252
  };
  // Specifies the widget's height.
  @Input()
  // eslint-disable-next-line @typescript-eslint/ban-types
  height: number | string | Function = '100%';
  // Specifies whether to highlight rows and cells whose data changed. 
  @Input()
  highlightChanges: boolean = false;
  // Specifies text for a hint that appears when a user pauses on the widget.
  //@Input()
  //hint: string = undefined;

  // Specifies which data field provides keys for data items. Applies only if data is a .
  @Input()
  keyExpr: string = `id`;
  // Configures the load panel.
  @Input()
  loadPanel: object = {
    enabled: null,
    height: 90,
    indicatorSrc: '',
    shading: false,
    shadingColor: '',
    showIndicator: true,
    showPane: true,
    text: 'Loading...',
    width: 200
  };
  // Allows you to build a  in the grid.
  //@Input()
  //masterDetail: object = {
  //    autoExpandAll: false,
  //    enabled: false,
  //    template: null
  //};
  // Specifies text shown when the widget does not display any data.
  @Input()
  noDataText: string = 'داده ای یافت نشد!';

  //PeymanMH
  _pagingEnabled: boolean = true;
  @Input()
  get pagingEnabled(): boolean {
    return this._pagingEnabled;
  }
  set pagingEnabled(val: boolean) {
    this._pagingEnabled = val == null ? true : val;
    this.paging = {
      enabled: this._pagingEnabled,
      pageIndex: this.pagingIndex,
      pageSize: this._pagingSize
    };

    this.pager = {
      showPageSizeSelector: true,
      showInfo: true,
      allowedPageSizes: '[10, 20, 50, 100]',
      infoText: 'صفحه {0} از {1} (تعداد کل {2} سطر)',
      visible: this._pagingEnabled
    };

    this.detectChanges();
  }


  // Configures the pager.
  @Input()
  pager: object = {
    showPageSizeSelector: true,
    showInfo: true,
    allowedPageSizes: '[10, 20, 50, 100]',
    infoText: 'صفحه {0} از {1} (تعداد کل {2} سطر)',
    visible: this._pagingEnabled
  };

  @Input()
  pagingIndex: number = 0;

  _pagingSize: number = 20;
  @Input()
  set pagingSize(val: number) {
    this._pagingSize = val || 20;
    this.paging.pageSize = this._pagingSize;
    this.detectChanges();
  }
  get pagingSize(): number {
    return this._pagingSize;
  }

  @Input()
  orderByColumn: string = 'id';

  // Configures paging.

  paging: any = {
    enabled: this._pagingEnabled,
    pageIndex: this.pagingIndex,
    pageSize: this._pagingSize
  };


  // Notifies the <strong>DataGrid</strong> of the server's data processing operations.
  @Input()
  remoteOperations: any
    = {
      filtering: false,
      grouping: false,
      groupPaging: false,
      paging: true,
      sorting: true,
      summary: false
    };
  // Specifies whether to render the , , and columns with  set to <strong>true</strong> after other elements.
  //@Input()
  //renderAsync: boolean = false;
  // Specifies whether to repaint only those cells whose data changed.
  //@Input()
  //repaintChangesOnly: boolean = false;
  // Specifies whether rows should be shaded differently.
  @Input()
  rowAlternationEnabled: boolean = true;
  // Specifies a custom template for rows.
  //@Input()
  //rowTemplate: string | Function = null;

  _rtlEnabled: boolean = true;
  // Switches the widget to a right-to-left representation.
  @Input()
  get rtlEnabled() {
    return this._rtlEnabled;
  }

  set rtlEnabled(val: boolean) {
    this._rtlEnabled = val;
  }

  // Configures scrolling.
  @Input()
  scrolling: object = {
    columnRenderingMode: 'standard',
    mode: 'standard',
    preloadEnabled: true,
    rowRenderingMode: 'standard',
    scrollByContent: true,
    scrollByThumb: true,
    showScrollbar: 'onScroll',
    useNative: false
  };
  // Configures the search panel.
  @Input()
  searchPanel: object = {
    highlightCaseSensitive: false,
    highlightSearchText: false,
    placeholder: 'Search...',
    searchVisibleColumnsOnly: false,
    text: '',
    visible: false,
    width: 160
  };
  // Allows you to select rows or learn which rows are selected. Applies only if <strong>selection</strong>. is <strong>false</strong>.

  selectedRowKeysValue: any[] = [];

  @Input()
  get selectedRowKeys() {
    return this.selectedRowKeysValue;
  }

  set selectedRowKeys(val: any[]) {
    this.selectedRowKeysValue = val;
    this.cdr.detectChanges();
  }

  // Configures runtime selection.
  @Input()
  selection: object = {
    allowSelectAll: true,
    deferred: false,
    mode: 'multiple',
    selectAllMode: 'page',
    showCheckBoxesMode: 'onClick', // onLongTap, always,none
  };
  // Specifies  for the rows that must be selected initially. Applies only if <strong>selection</strong>. is <strong>true</strong>.
  //@Input()
  //selectionFilter: object[] = [];
  // Specifies whether the outer borders of the widget are visible.
  @Input()
  showBorders: boolean = true;
  // Specifies whether column headers are visible.
  @Input()
  showColumnHeaders: boolean = true;
  // Specifies whether vertical lines that separate one column from another are visible.
  @Input()
  showColumnLines: boolean = false;
  // Specifies whether horizontal lines that separate one row from another are visible.
  @Input()
  showRowLines: boolean = true;

  @Input()
  showFixedColumns: boolean = true;
  // Allows you to sort  according to the values of group summary items.
  //@Input()
  //sortByGroupSummaryInfo: object[] = [
  //    {
  //        groupColumn: undefined,
  //        sortOrder: undefined,
  //        summaryItem: undefined
  //    }
  //];
  // Configures runtime sorting.
  @Input()
  sorting: object = {
    ascendingText: 'مرتب سازی صعودی',
    clearText: 'پاک کردن مرتب سازی',
    descendingText: 'مرتب سازی نزولی',
    mode: 'single'
  };
  // Configures state storing.
  @Input()
  stateStoring: object = {
    customLoad: null,
    customSave: null,
    enabled: false,
    savingTimeout: 2000,
    storageKey: 'storage',
    type: 'localStorage'
  };
  // Specifies the options of the grid summary.
  //@Input()
  //summary: object = {
  //    calculateCustomSummary: null,
  //    groupItems: [],
  //    recalculateWhileEditing: false,
  //    skipEmptyValues: true,
  //    texts: {},
  //    totalItems: [],
  //};
  // Specifies the number of the element when the Tab key is used for navigating.
  @Input()
  tabIndex: number = 0;
  // Specifies whether to enable two-way data binding.
  @Input()
  twoWayBindingEnabled: boolean = true;
  // Specifies whether the widget is visible.
  @Input()
  visible: boolean = true;
  // Specifies the widget's width.
  @Input()
  // eslint-disable-next-line @typescript-eslint/ban-types
  width: number | string | Function = '100%';
  // Specifies whether text that does not fit into a column should be wrapped.
  @Input()
  wordWrapEnabled: boolean = false;

  /**
   * Configures row reordering using drag and drop gestures.
   */
  @Input() rowDragging: {
    allowDropInsideItem?: boolean;
        allowReordering?: boolean;
        autoScroll?: boolean;
        boundary?: string | UserDefinedElement | undefined;
        container?: string | UserDefinedElement | undefined;
        cursorOffset?: string | {
            x?: number;
            y?: number;
        };
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        data?: any | undefined;
        dragDirection?: DragDirection;
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        dragTemplate?: any | undefined;
        dropFeedbackMode?: DragHighlight;
        filter?: string;
        group?: string | undefined;
        handle?: string;
        // eslint-disable-next-line @typescript-eslint/ban-types
        onAdd?: Function;
        // eslint-disable-next-line @typescript-eslint/ban-types
        onDragChange?: Function;
        // eslint-disable-next-line @typescript-eslint/ban-types
        onDragEnd?: Function;
        // eslint-disable-next-line @typescript-eslint/ban-types
        onDragMove?: Function;
        // eslint-disable-next-line @typescript-eslint/ban-types
        onDragStart?: Function;
        // eslint-disable-next-line @typescript-eslint/ban-types
        onRemove?: Function;
        // eslint-disable-next-line @typescript-eslint/ban-types
        onReorder?: Function;
        scrollSensitivity?: number;
        scrollSpeed?: number;
        showDragIcons?: boolean;
  } = {};


  // A function that is executed before an adaptive detail row is rendered.
  //@Output()
  //onAdaptiveDetailRowPreparing = new EventEmitter<any>();

  // A function that is executed when a cell is clicked or tapped. Executed before .
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onCellClick = new EventEmitter<any>();

  //// A function that is executed after the pointer enters or leaves a cell.
  //@Output()
  //onCellHoverChanged = new EventEmitter<any>();
  // A function that is executed after a cell is created.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onCellPrepared = new EventEmitter<any>();
  // A function that is executed when the widget's content is ready and each time the content is changed.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onContentReady = new EventEmitter<any>();


  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onSortingChange = new EventEmitter<any>();
  // A function that is executed before the context menu is rendered.

  //@Output()
  //onContextMenuPreparing = new EventEmitter<any>();
  // A function that is executed when an error occurs in the data source. 
  //@Output()
  //onDataErrorOccurred = new EventEmitter<any>();
  // A function that is executed before the widget is .
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onDisposing = new EventEmitter<any>();

  // A function that is executed before a cell or row switches to the editing state.
  //@Output()
  //onEditingStart = new EventEmitter<any>();
  //// A function that is executed after an editor is created.
  //@Output()
  //onEditorPrepared = new EventEmitter<any>();
  //// A function that is executed before an editor is created.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onEditorPreparing = new EventEmitter<any>();
  //// A function that is executed after data is exported.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onExported = new EventEmitter<any>();
  //// A function that is executed before data is exported.
  //@Output()
  //onExporting = new EventEmitter<any>();
  //// A function that is executed before a file with exported data is saved to the user's local storage.
  //@Output()
  //onFileSaving = new EventEmitter<any>();
  //// A function that is executed after the focused cell changes. 
  //@Output()
  //onFocusedCellChanged = new EventEmitter<any>();
  //// A function that is executed before the focused cell changes.
  //@Output()
  //onFocusedCellChanging = new EventEmitter<any>();
  //// A function that is executed after the focused row changes. Applies only when  is <strong>true</strong>.
  //@Output()
  //onFocusedRowChanged = new EventEmitter<any>();
  //// A function that is executed before the focused row changes. Applies only when  is <strong>true</strong>.
  //@Output()
  //onFocusedRowChanging = new EventEmitter<any>();
  // A function that is executed only once, after the widget is initialized. 
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onInitialized = new EventEmitter<any>();

  @Output()
  dataSourceChange = new EventEmitter<any>();
  // A function that is executed before a new row is added to the widget.
  //@Output()
  //onInitNewRow = new EventEmitter<any>();
  // A function that is executed when the widget is in focus and a key has been pressed down.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onKeyDown = new EventEmitter<any>();
  // A function that is executed after a widget option is changed.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onOptionChanged = new EventEmitter<any>();
  // A function that is executed when a row is clicked or tapped.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onRowClick = new EventEmitter<any>();
  // A function that is executed after a row is collapsed.
  //@Output()
  //onRowCollapsed = new EventEmitter<any>();
  //// A function that is executed before a row is collapsed.
  //@Output()
  //onRowCollapsing = new EventEmitter<any>();
  //// A function that is executed after a row is expanded.
  //@Output()
  //onRowExpanded = new EventEmitter<any>();
  //// A function that is executed before a row is expanded.
  //@Output()
  //onRowExpanding = new EventEmitter<any>();
  // A function that is executed after a new row has been inserted into the data source.
  //@Output()
  //onRowInserted = new EventEmitter<any>();
  //// A function that is executed before a new row is inserted into the data source.
  //@Output()
  //onRowInserting = new EventEmitter<any>();
  // A function that is executed after a row is created.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onRowPrepared = new EventEmitter<any>();
  // A function that is executed after a row has been removed from the data source.
  //@Output()
  //onRowRemoved = new EventEmitter<any>();
  //// A function that is executed before a row is removed from the data source.
  //@Output()
  //onRowRemoving = new EventEmitter<any>();
  //// A function that is executed after a row has been updated in the data source.
  //@Output()
  //onRowUpdated = new EventEmitter<any>();
  //// A function that is executed before a row is updated in the data source.
  //@Output()
  //onRowUpdating = new EventEmitter<any>();
  //// A function that is executed after cells in a row are validated against .
  //@Output()
  //onRowValidating = new EventEmitter<any>();
  // A function that is executed after selecting a row or clearing its selection. 
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onSelectionChanged = new EventEmitter<any>();
  // A function that is executed before the toolbar is created.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onToolbarPreparing = new EventEmitter<any>();

  //* A function that is executed when a cell is double - clicked or double - tapped.Executed before onRowDblClick.
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onCellDblClick = new EventEmitter<any>();


  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onFilterValueChange = new EventEmitter<any>();


  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onGetDataSource = new EventEmitter<any>();



  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onConditionClick = new EventEmitter<any>();


  // PeymanMH
  @Input() isShowScroll: boolean = false;

  // On click item of menu operation
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClickOperationItem = new EventEmitter<any>();


  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onRowDblClick = new EventEmitter<any>();

  @Input() dataSourceModel: any = null;

  _operationColumnMenuItem: any;
  @Input()
  get operationColumnMenuItem(): any {
    return this._operationColumnMenuItem;
  }
  set operationColumnMenuItem(val: any) {
    this._operationColumnMenuItem = null;
    this._operationColumnMenuItem = val;
    if (this.operationColumnMenuItem != null &&
       this.operationColumnMenuItem[0] != null &&
        this.operationColumnMenuItem[0].items != null) {
      this.contextMenuDataSource = [{ 
        html: '<i class=\'icon fa-icon-copy fa-menuActionItem\'><span class=\'fa-menuActionTitle\'>کپی</span></i>',
         id: 'copyClipboard' }];
      this.contextMenuDataSource = 
      this.contextMenuDataSource.concat(this.operationColumnMenuItem[0].items);
    }
  }

  @Input() operationColumnMenuItemDisplayExpr: any;

  @Input() operationColumnHideMenuOnMouseLeave: boolean = true;

  @Input() selectedExpr?: string = undefined;

  onClickItem(e: any, info: any) {
    this.onClickOperationItem.emit({ e, i: info });
  }

  @Input()
  showOperationMenuModes: any = {
    name: 'onHover',
    delay: { show: 0, hide: 500 }
  };

  @Input() selectRowKeyExpr: number[] = [];
  @Input() selectRowBooleanColumnName?: string = undefined;
  @Input() selectRowBooleanCondition: boolean = true;
  @Input() loadWithPaging: boolean = true;
  @Input() editOnGrid: boolean = false;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onAfterChangeDataSource = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onPagingChange = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onAfterViewInit = new EventEmitter<any>();


  lastDataModel: any;

  gridData: any[] = [];

  updateDimensions() {
    if (this.dataGrid != null && this.dataGrid.instance != null) {
      this.dataGrid.instance.updateDimensions();
    }
  }

  loadChangeDataSource() {
    if (this.changeDataSourceValue != null) {
      this.changeDataSource(
        this.changeDataSourceValue.model, 
        this.changeDataSourceValue.routingAction, this.changeDataSourceValue.hasAccess);
    }
  }

  // change Data Source
  changeDataSource<T>(model: T, routingAction: string, hasAccess: boolean = true): void {
    if (!hasAccess)
      return;

    this.dataSource = [];

    if (model == null)
      return;

    const dataSourceModel: any = this.buildDataSourceModel(model, routingAction);
    this.lastDataModel = dataSourceModel;
    if (this.loadWithPaging) {
      this.dataSource = this.dataSourceWithPaginig(dataSourceModel);
    }
    else {
      this.dataSourceWithoutPaginig(dataSourceModel);
    }

    window.dispatchEvent(new Event('resize'));
    this.dataGrid!.instance.updateDimensions();

    this.cdr.detectChanges();
  }

  buildDataSourceModel<T>(model: T, routingAction: string): any {
    const dataSourceModel: any = {};
    if (model != null) {
      dataSourceModel.model = model;
      dataSourceModel.listUrl = routingAction;
    }
    return dataSourceModel;
  }

  clearFilter() {
    this.dataGrid!.instance.clearFilter();
  }

  filter(filters: any) {
    this.dataGrid!.instance.filter(filters);
  }

  refresh() {
    this.dataGrid!.instance.refresh();
  }

  dataSourceWithPaginig(model: any): any {
    return new DataSource({
      store: new CustomStore({
        key: this.keyExpr,
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        load: (loadOptions: LoadOptions<any> | any) => {
          if (this._pagingEnabled && loadOptions.take != null) {
            if (this.remoteOperations.paging && this.isShowGroupPanelValue != true)
              if (loadOptions.take == null)
                return;

            model.model.pageSize = loadOptions.take;
            model.model.pageIndex = loadOptions.skip / loadOptions.take;
            model.model.orderByColumn = 
            model.model.orderByColumn == null ? this.orderByColumn : model.model.orderByColumn;

            this.pagingSize = model.model.pageSize;
            this.pagingIndex = model.model.pageIndex;

            if (loadOptions.sort) {

              if (loadOptions.sort.length > 1)
                model.model.orderByColumn = loadOptions.sort[0].selector == null ? this.orderByColumn : loadOptions.sort[0].selector;
              else
                model.model.orderByColumn = this.orderByColumn;
              if (loadOptions.sort[0].desc)
                model.model.sortOrder = 'desc';
              else
                model.model.sortOrder = 'asc';
            }
          } else {
            if (loadOptions.sort) {
              if (loadOptions.sort.length > 1)
                model.model.orderByColumn = loadOptions.sort[0].selector == null ? this.orderByColumn : loadOptions.sort[0].selector;
              else
                model.model.orderByColumn = this.orderByColumn;
              if (loadOptions.sort[0].desc)
                model.model.sortOrder = 'desc';
              else
                model.model.sortOrder = 'asc';
              // Comment for use sortOrder in model
              //else
              //    model.model.sortOrder = null;
            }

          }

          const serverData = lastValueFrom(this.httpService.post(model.listUrl, model.model));

          const result = serverData.then((res: any) => {
            this.onAfterChangeDataSource.emit(res);
            const totalCount = res.data.length < 1
              ? 0
              : (res.data[0].totalCount == null
                ? res.data.length
                : res.data[0].totalCount);

            this.onGetDataSource.emit(res);


            if (this.selectRowBooleanColumnName != null) {
              this.selectRowKeyExpr = [];
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i][this.selectRowBooleanColumnName] === this.selectRowBooleanCondition)
                  this.selectRowKeyExpr.push(res.data[i][this.keyExpr]);
              }
              this.selectedRowKeys = this.selectRowKeyExpr;
            }

            this.cdr.detectChanges();

            this.gridData = res.data;
            this.dataGrid!.instance.updateDimensions();
            const data: ResolvedData<any> = { data: res.data, totalCount };
            return data;
          }) as Promise<ResolvedData<any>>;

          return result as any;
        }
      })
    });

  }

  dataSourceWithoutPaginig(model: any) {
    return this.httpService.post(model.listUrl, model.model, false).subscribe((res: any) => {
      this.onAfterChangeDataSource.emit(res);

      const totalCount = res.data.length < 1
        ? 0
        : (res.data[0].totalCount == null
          ? res.data.length
          : res.data[0].totalCount);

      this.dataSource = res.data;


      this.selectRowKeyExpr = [];
      if (this.selectRowBooleanColumnName != null) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i][this.selectRowBooleanColumnName] === this.selectRowBooleanCondition)
            this.selectRowKeyExpr.push(res.data[i][this.keyExpr]);
        }
      }


      this.selectedRowKeys = this.selectRowKeyExpr;

      this.gridData = res.data;

      this.onGetDataSource.emit(res);
      this.dataGrid!.instance.updateDimensions();
      return {
        data: res.data,
        totalCount,
      };
    });
  }

  onContentReadyInner(e: any): void {
    //Start Change Command:Select Width
    if (e.component.shouldSkipNextReady) {
      e.component.shouldSkipNextReady = false;
    }
    else {
      e.component.shouldSkipNextReady = true;
      e.component.columnOption('command:select', 'width', 30);
    }
    //End Change Command:Select Width

    setTimeout(() => {
      this.dataGrid!.instance.updateDimensions();
    }, 500);

    this.onContentReady.emit(e);
  }


  setScroll() {
    if (this.rtlEnabled == true) {
      const width = this.dataGrid!.instance?.getScrollable()?.clientWidth();
      this.dataGrid!.instance?.getScrollable()?.scrollTo(width);
    }
  }

  onOpenedExtra(e: any): void {

  }

  subMenuShowing(e: any): void {

  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {

    if (this.dataGrid != null) {
      this.dataGrid.instance.dispose();
    }
  }

  onFilterValueChangeExtra(e: any, fn: string): void {

  }

  onCellClickExtra(e: any) {
    this.dataForCopy = e.value;
    this.onCellClick.emit(e);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardHotkey(e: KeyboardEvent) {
    if (this.activeShortcutKey == true && e.ctrlKey == true && e.key == 'c') {
      if (this.dataForCopy != null && this.dataForCopy != '') {
        navigator.clipboard.writeText(this.dataForCopy).then(function () {
          // this.yaldaAlertService.notify('کپی شد', '', AlertType.Success);
        }.bind(this));
      }
    }
  }


  onOptionChangedExtra(e: any) {
    this.onOptionChanged.emit(e);

    if (e.name == 'columns' && !Array.isArray(e.value)) {
      const colnum: number = parseInt(e.fullName.substring(8, e.fullName.length - 7));
      this.column![colnum].width = e.value;
      this.columns[colnum].width = e.value;
    }
  }

  dataSourceChangeExtra(e: any) {
    this.dataGrid!.instance.updateDimensions();
    this.setScroll();
    this.dataSourceChange.emit(e);
  }

  onConditionClickExtra(e: any, cell: any) {
    this.onConditionClick.emit({ event: e, cellData: cell });
  }


  onShowFixedColumnChanged(e: any): void {
    const columns = this.columns == null ? [] : JSON.parse(JSON.stringify(this.columns));

    if (e.value == null)
      return;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].fixed == true)
        columns[i].visible = e.value;
    }

    this.columns = JSON.parse(JSON.stringify(columns));
    this.cdr.detectChanges();
  }
}

class Conditions {
  public colName?: string;
  public function?: (rowData: any) => string;
}
