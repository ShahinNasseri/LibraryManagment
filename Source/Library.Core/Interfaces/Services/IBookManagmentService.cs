using Library.Common.DTOs.BookManagment.Requests;
using Library.Common.DTOs.Commons;
using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Services
{
    public interface IBookManagmentService
    {
        Task BorrowBook(BorrowBookRequest request);
        Task<IEnumerable<Book>> GetBookList(GetBooksListRequest request);
        Task<IEnumerable<Loan>> GetLoanList(GetLoanListRequest request);
        Task InsertBook(InsertBookRequest request);
        Task RemoveBook(EntityIds request);
        Task ReturnedBook(ReturnBookRequest request);
        Task UpdateBook(UpdateBookRequest request);
    }
}
