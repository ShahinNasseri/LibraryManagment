using Library.Common.DTOs.BookManagment.Requests;
using Library.Common.Exceptions;
using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Services.BookManagment
{
    public partial class BookManagmentService
    {
        private static void MapUpdateBookWithBookEntity(UpdateBookRequest request, Book book)
        {
            book.Title = request.Title;
            book.Publisher = request.Publisher;
            book.Summary = request.Summary;
            book.Title = request.Title;
            book.Genre = request.Genre;
            book.Isbn = request.Isbn;
        }

        private async Task<Book> GetBookById(UpdateBookRequest request)
        {
            var book = await _uow.Books.GetByIdAsync(request.BookId);
            if (book is null)
                throw new CustomInvalidRequestException("The Requested Book Is not exsist in database anymore");
            return book;
        }
        private async Task UpdateBookInDatabase(Book book)
        {
            _uow.Books.Update(book);
            await _uow.SaveChangesAsync();
        }

        private async Task AddBookInDatabase(Book book)
        {
            await _uow.Books.AddAsync(book);
            await _uow.SaveChangesAsync();
        }
        private static Book MapInsertBookRequest(InsertBookRequest request)
        {
            return new Book()
            {
                Genre = request.Genre,
                Isbn = request.Isbn,
                PublicationYear = request.PublicationYear,
                Publisher = request.Publisher,
                Summary = request.Summary,
                Title = request.Title
            };
        }

        private async Task SaveLoanInDatabase(Loan loan)
        {
            await _uow.Loans.AddAsync(loan);
            await _uow.SaveChangesAsync();
        }

        private static Loan CreateLoanEntity(BorrowBookRequest request, Book book, long userId)
        {
            return new Loan()
            {
                BookId = book.BookId,
                Returned = false,
                LoanDate = DateTime.UtcNow,
                ReturnDate = request.ReturnDate,
                UserId = userId,
            };
        }

        private static long CheckAndExtractUserId(BorrowBookRequest request)
        {
            if (request._UserIsAdmin == true && request.UserId is null)
                throw new CustomInvalidRequestException("UserId is not specified");

            long userId;
            if (request._UserIsAdmin == true)
                userId = request.UserId.Value;
            else
                userId = request._UserId.Value;
            return userId;
        }

        private async Task<Book> GetBookIfAvailable(BorrowBookRequest request)
        {
            var book = await _uow.Books.GetByIdAsync(request.BookId);
            if (book is null)
                throw new CustomInvalidRequestException("The Requested Book is not exsist anymore");

            if (book.Loan.Any(a => a.Returned == false))
                throw new CustomOperationFailException("The Requested book is not available");
            return book;
        }

        private async Task UpdateLoanInDatabase(Loan loan)
        {
            _uow.Loans.Update(loan);
            await _uow.SaveChangesAsync();
        }

        private static void MarkLoanAsReturned(Loan loan)
        {
            loan.Returned = true;
        }

        private async Task<Loan> GetLoanById(int loanId)
        {
            var loan = await _uow.Loans.GetByIdAsync(loanId);
            if (loan is null)
                throw new CustomInvalidRequestException("There is not such loan in system");
            return loan;
        }
    }
}
