﻿using Library.Common.DTOs.AdminManagment.Requests;
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
  

    public class BookRepository : IBookRepository
    {
        private readonly DbContext _context;

        public BookRepository(DbContext context)
        {

            _context = context;
        }

        public async Task<IEnumerable<Book>> GetAllAsync(bool trackEntity = false)
        {
            if (trackEntity)
                return await _context.Set<Book>().ToListAsync();
            else
                return await _context.Set<Book>().AsNoTracking().ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(long id)
        {
            return await _context.Set<Book>().FindAsync(id);
        }

        public async Task<Book> AddAsync(Book entity)
        {
            await _context.Set<Book>().AddAsync(entity);
            return entity;
        }

        public void Update(Book entity)
        {
            _context.Set<Book>().Update(entity);
        }

        public void Delete(Book entity)
        {
            _context.Set<Book>().Remove(entity);
        }

        public async Task<IEnumerable<Book>> GetBookListWithPaginationAsync(GetBooksListRequest request)
        {
            IQueryable<Book> query = _context.Set<Book>();

            if (request.inLoan is not null)
                query.Where(b => b.Loan != null && b.Loan.Any(a => a.Returned == false));
            if (request.BookId is not null)
                query.Where(a => a.BookId == request.BookId);
            if (request.FreeBooks is not null)
                query.Where(a => a.Loan == null || !a.Loan.Any(l => l.Returned == false));

            // Search filtering
            if (!string.IsNullOrEmpty(request.SearchString))
            {
                if (int.TryParse(request.SearchString, out int searchId))
                    query = query.Where(b => b.BookId == searchId);
                else
                    query = query.Where(b =>
                    b.Isbn.Contains(request.SearchString) ||
                    b.Publisher.Contains(request.SearchString) ||
                    b.Genre.Contains(request.SearchString) ||
                    b.Title.Contains(request.SearchString) ||
                    b.Summary.Contains(request.SearchString));
            }

            // Dynamic Sorting
            if (!string.IsNullOrEmpty(request.ColumnOrder))
                query = query.AddSorting(request);

            // Pagination
            if (request.PageIndex.HasValue && request.PageSize.HasValue)
                query.Paginate(request.PageIndex.Value, request.PageSize.Value);

            return await query.AsNoTracking().ToListAsync();
        }

        public async Task DeleteRangeAsync(string ids)
        {
            // Convert the string of IDs into a list of integers
            var idsToDelete = ids.Split(',').Select(long.Parse).ToList();

            var itemsToDelete = await _context.Set<Book>().Where(book => idsToDelete.Contains(book.BookId)).ToListAsync();
            _context.Set<Book>().RemoveRange(itemsToDelete);
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.Set<Book>().FindAsync(id);
        }

    }
}
