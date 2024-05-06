using Library.Common.DTOs.BookManagment.Requests;
using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Repositories
{
    public interface IBookRepository
    {
        Task<Book> AddAsync(Book entity);
        void Delete(Book entity);
        Task<Book?> GetByIdAsync(int id);
        Task DeleteRangeAsync(string ids);
        Task<IEnumerable<Book>> GetAllAsync(bool trackEntity = false);
        Task<IEnumerable<Book>> GetBookListWithPaginationAsync(GetBooksListRequest request);
        Task<Book?> GetByIdAsync(long id);
        void Update(Book entity);
    }
}
