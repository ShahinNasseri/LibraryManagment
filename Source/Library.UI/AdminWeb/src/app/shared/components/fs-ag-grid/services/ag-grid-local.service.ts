import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgGridLocalService {
  private pageSize: Subject<number> = new Subject<number>();
  public pageSize$ = this.pageSize.asObservable();

  constructor() {}

  setPageSize(number: number) {
    this.pageSize.next(number);
  }
}
