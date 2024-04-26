import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from '@core/ai/http.service';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'hp-data-grid',
  templateUrl: './hp-data-grid.component.html',
  styleUrls: ['./hp-data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HpDataGridComponent implements OnInit {

  Console = console;

  @Input() dataSource: any[] = [];
  @Input() globalFilterFields: any[] = [];
  @Input() selectedItems: any[] = [];
  @Input() columns: columnsType[] = [];
  @Input() dataKey: string = 'id';
  @Input() pageSize: number = 10;
  @Input() listModel: any = {};
  @Input() listUrl: string = '';
  @Input() resizableColumns: boolean = true;
  @Input() rowHover: boolean = true;
  @Input() menuItems: MenuItem[] = [];
  @Input() contextMenuSelectionMode: string = 'joint';

  selectedItem: any = {};
  public loading: boolean = false;
  public totalCount: number = 0;
  public selectAll: boolean = false;

  constructor(
    private readonly httpService: HttpService,
    private readonly cdr: ChangeDetectorRef,
  ) {
 
    if (this.dataKey == '' || this.dataKey == null) {
      throw new Error('id is not define in hp-data-grid');
    }
  }


  ngOnInit() {

  }

  get selectedItemsIdsArray() {
    return this.selectedItems.map(item => { return item[this.dataKey]; });
  }

  get selectedItemsIdsString() {
    return this.selectedItemsIdsArray.join(',');
  }

  rowTrackBy = (index: any, item: any) => { return item[this.dataKey]; };

  async loadData(event: TableLazyLoadEvent) {
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

    this.dataSource = res.data ?? [];


    if (res.data) {
      this.totalCount = res.data[0].totalCount;
    } else {
      this.totalCount = 0;
    }


    this.loading = false;
    this.cdr.detectChanges();
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.dataSource.length;
    this.selectedItems = value;
    this.cdr.detectChanges();
  }


  onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
      this.selectedItems = JSON.parse(JSON.stringify(this.dataSource));
      this.selectAll = true;
      this.cdr.detectChanges();
    }
    else {
      this.selectedItems = [];
      this.selectAll = false;
      this.cdr.detectChanges();
    }

  }

}

export class columnsType {
  constructor(public field: string = '', public header: string = '', public type: string = 'text', public width?: string) {
    this.field = field;
    this.header = header;
    this.type = type;
    this.width = width ?? '100';
  }
}
