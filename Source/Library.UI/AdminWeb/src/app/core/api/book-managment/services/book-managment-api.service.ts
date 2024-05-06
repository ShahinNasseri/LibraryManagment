import { Injectable, inject } from '@angular/core';
import { ApiBaseService } from '@core/general/services/api-base.service';
import { InsertBookRequest } from '../models/insert-book-request.model';
import { ApiResponse } from '@core/ai/http.service';
import { EntityIds } from '@core/general/models/entity-ids.model';
import { BorrowBookRequest } from '../models/borrow-book-request.model';
import { ReturnBookRequest } from '../models/return-book-request.model';
import { UpdateBookRequest } from '../models/update-book-request.model';
import { GetLoanListRequest } from '../models/get-loan-list-request.model';
import { GetBooksListRequest } from '../models/get-books-list-request.model';

@Injectable({
  providedIn: 'root'
})
export class BookManagmentApiService {

  private readonly http = inject(ApiBaseService);

  insertBook(request: InsertBookRequest) {
    return this.http.post<ApiResponse<object>>('/BookManagment/InsertBook', request);
  }

  removeBook(request: EntityIds) {
    return this.http.post<ApiResponse<object>>('/BookManagment/RemoveBook', request);
  }

  borrowBook(request: BorrowBookRequest) {
    return this.http.post<ApiResponse<object>>('/BookManagment/BorrowBook', request);
  }

  returnedBook(request: ReturnBookRequest){
    return this.http.post<ApiResponse<object>>('/BookManagment/ReturnedBook', request);
  }

  updateBook(request: UpdateBookRequest){
    return this.http.post<ApiResponse<object>>('/BookManagment/UpdateBook', request);
  }

  getLoanList(request: GetLoanListRequest){
    return this.http.post<ApiResponse<object>>('/BookManagment/GetLoanList', request);
  }

  getBookList(request: GetBooksListRequest){
    return this.http.post<ApiResponse<object>>('/BookManagment/GetBookList', request);
  }
}
