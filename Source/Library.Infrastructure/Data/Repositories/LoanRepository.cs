using Library.Common.DTOs.BookManagment.Requests;
using Library.Common.Helpers.EF;
using Library.Core.Domain.Entities;
using Library.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Infrastructure.Data.Repositories
{


    public class LoanRepository : ILoanRepository
    {
        private readonly DbContext _context;

        public LoanRepository(DbContext context)
        {

            _context = context;
        }

        public async Task<IEnumerable<Loan>> GetAllAsync(bool trackEntity = false)
        {
            if (trackEntity)
                return await _context.Set<Loan>().ToListAsync();
            else
                return await _context.Set<Loan>().AsNoTracking().ToListAsync();
        }

        public async Task<Loan?> GetByIdAsync(long id)
        {
            return await _context.Set<Loan>().FindAsync(id);
        }

        public async Task<Loan> AddAsync(Loan entity)
        {
            await _context.Set<Loan>().AddAsync(entity);
            return entity;
        }

        public void Update(Loan entity)
        {
            _context.Set<Loan>().Update(entity);
        }

        public void Delete(Loan entity)
        {
            _context.Set<Loan>().Remove(entity);
        }

        public async Task<IEnumerable<Loan>> GetBookListWithPaginationAsync(GetLoanList request)
        {
            IQueryable<Loan> query = _context.Set<Loan>();

            if (request.IsOverDue is not null)
                query.Where(l => l.Returned == false && l.ReturnDate <= DateTime.UtcNow);
            if (request.UserId is not null)
                query.Where(l => l.UserId == request.UserId);
            if (request.IsReturned is not null)
                query.Where(l => l.Returned == request.IsReturned);
            if (request.LoanId is not null)
                query.Where(a => a.Id == request.LoanId);

            // Search filtering
            if (!string.IsNullOrEmpty(request.SearchString))
            {
                if (int.TryParse(request.SearchString, out int searchId))
                    query = query.Where(l => l.Id == searchId);

                else
                    query = query.Where(l =>
                    l.User.FullName.Contains(request.SearchString) ||
                    l.User.Username.Contains(request.SearchString) ||
                    l.Book.Title.Contains(request.SearchString));
            }

            // Dynamic Sorting
            if (!string.IsNullOrEmpty(request.ColumnOrder))
                query = query.AddSorting(request);

            // Pagination
            if (request.PageIndex.HasValue && request.PageSize.HasValue)
                query.Paginate(request.PageIndex.Value, request.PageSize.Value);

            return await query.AsNoTracking().ToListAsync();
        }

        public async Task<Loan?> GetByIdAsync(int id)
        {
           return await _context.Set<Loan>().FindAsync(id);
        }
    }
}
