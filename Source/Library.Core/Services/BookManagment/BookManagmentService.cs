using Library.Core.Interfaces.Services;
using Library.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Common.DTOs.Auth.Requests;
using Library.Common.DTOs.Auth.Responses;
using Library.Common.Exceptions;
using Library.Core.Domain.Entities;
using Library.Common.DTOs.BookManagment.Requests;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Commons;

namespace Library.Core.Services.BookManagment
{
    public partial class BookManagmentService
    {
        private readonly IUnitOfWork _uow;

        public BookManagmentService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task InsertBook(InsertBookRequest request)
        {
            Book book = MapInsertBookRequest(request);
            await AddBookInDatabase(book);
        }

        public async Task UpdateBook(UpdateBookRequest request)
        {
            Book book = await GetBookById(request);
            MapUpdateBookWithBookEntity(request, book);
            await UpdateBookInDatabase(book);
        }

        public async Task<IEnumerable<Book>> GetBookList(GetBooksList request)
        {
            return await _uow.Books.GetBookListWithPaginationAsync(request);
        }

        public async Task BorrowBook(BorrowBookRequest request)
        {
            Book book = await GetBookIfAvailable(request);
            long userId = CheckAndExtractUserId(request);

            Loan loan = CreateLoanEntity(request, book, userId);
            await SaveLoanInDatabase(loan);
        }

        public async Task ReturnedBook(ReturnBookRequest request)
        {
            Loan loan = await GetLoanById(request.LoanId);
            MarkLoanAsReturned(loan);
            await UpdateLoanInDatabase(loan);
        }

        public async Task<IEnumerable<Loan>> GetLoanList(GetLoanList request)
        {
            return await _uow.Loans.GetBookListWithPaginationAsync(request);
        }

    }
}
