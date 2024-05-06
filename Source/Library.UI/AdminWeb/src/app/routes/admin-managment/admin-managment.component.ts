import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminManagmentApiService, GetAdminListRequest } from '@core/api/admin-managment';
import { AlertService } from '@core/general/services/alert.service';
import { FsAgGridModule } from '@shared/components/fs-ag-grid/fs-ag-grid.module';
import { FsToolbarModule } from '@shared/components/fs-toolbar/fs-toolbar.module';
import { GetAdminListReponse } from '@core/api/admin-managment/models/get-admin-list-reponse.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ApiResponse } from '@core/ai/http.service';
import { merge, take, tap } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';
import { AdminManagmentSaveComponent } from './admin-managment-save/admin-managment-save.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

const MatComponents: any[] = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  MatTableModule,
  MatPaginator,
  MatSortModule,
  MatCheckbox,
  MatDialogModule,
  AdminManagmentSaveComponent
];

@Component({
  selector: 'app-admin-managment',
  standalone: true,
  imports: [FsToolbarModule, FsAgGridModule, ...MatComponents],
  templateUrl: './admin-managment.component.html',
  styleUrl: './admin-managment.component.scss',
})
export class AdminManagmentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  _alertService = inject(AlertService);
  _cdr = inject(ChangeDetectorRef);
  _adminManagmentApiService = inject(AdminManagmentApiService);
  _dialog = inject(MatDialog);

  search: string = '';
  formModel: GetAdminListRequest = new GetAdminListRequest();
  gridUrl: string = '';
  title: string = 'Book Managment';

  displayedColumns: string[] = ['id', 'fullName', 'username', 'isActive', 'isAdmin'];
  data: any = [];
  dialog!: MatDialogRef<AdminManagmentSaveComponent>;
  constructor() {}

  ngOnInit(): void {
    this.gridUrl = this._adminManagmentApiService.listUrl;
  }

  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadData())
    )
    .subscribe();

    this.loadData();
  }

  ngOnDestroy(): void {}

  onAddAdminClick(){
   this.dialog = this._dialog.open(AdminManagmentSaveComponent, {});
    this.dialog.componentInstance.comelete.pipe(take(1)).subscribe((data) =>{
      this.dialog.close();
    });
  }

  loadData() {
    this.formModel.columnOrder = this.sort.active;
    this.formModel.sortOrder = this.sort.direction == 'asc' ? 1 : 2;
    this.formModel.searchString = this.search;
    this.formModel.pageIndex = this.paginator.pageIndex;
    this.formModel.pageSize = this.paginator.pageSize;

    // eslint-disable-next-line max-len
    this._adminManagmentApiService.ListAdmin(this.formModel).subscribe((data: ApiResponse<GetAdminListReponse[]>) => {
      this.data = data.data; // Adjust based on your API response

      if(data.data == null || data.data.length == 0)
        return;

      this.paginator.length = data.data[0].totalCount; // Adjust based on your API response
    });
  }
}
