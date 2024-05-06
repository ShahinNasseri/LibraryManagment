using Library.Common.DTOs.BookManagment.Requests;
using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Repositories
{
    public interface ILoanRepository
    {
        Task<Loan> AddAsync(Loan entity);
        void Delete(Loan entity);
        Task<Loan?> GetByIdAsync(int id);
        Task<IEnumerable<Loan>> GetAllAsync(bool trackEntity = false);
        Task<IEnumerable<Loan>> GetBookListWithPaginationAsync(GetLoanListRequest request);
        Task<Loan?> GetByIdAsync(long id);
        void Update(Loan entity);
    }
}
