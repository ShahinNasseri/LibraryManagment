using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Commons;
using Library.Common.Helpers.EF;
using Library.Core.Domain.Entities;
using Library.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Library.Infrastructure.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DbContext _context;

        public UserRepository(DbContext context)
        {

            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Set<User>().ToListAsync();
        }

        public async Task<User?> GetByIdAsync(long id)
        {
            return await _context.Set<User>().FindAsync(id);
        }

        public async Task<User> AddAsync(User entity)
        {
           await _context.Set<User>().AddAsync(entity);
            return entity;
        }

        public void Update(User entity)
        {
            _context.Set<User>().Update(entity);
        }

        public void Delete(User entity)
        {
            _context.Set<User>().Remove(entity);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
           return await _context.Set<User>().FirstOrDefaultAsync(x => x.Username == username);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Set<User>().FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User?> GetByEmailOrUsernameAsync(string emailOrUsername)
        {
            return await _context.Set<User>().FirstOrDefaultAsync(x => x.Email == emailOrUsername || x.Username == emailOrUsername);
        }

        public async Task<User?> GetByRefreshToken(string refreshToken)
        {
            return await _context.Set<User>().SingleOrDefaultAsync(x => x.RefreshToken == refreshToken);
        }

        public async Task DeleteRangeAsync(string ids)
        {
            // Convert the string of IDs into a list of integers
            var idsToDelete = ids.Split(',').Select(long.Parse).ToList();

            var usersToDelete = await _context.Set<User>().Where(user => idsToDelete.Contains(user.Id)).ToListAsync();
            _context.Set<User>().RemoveRange(usersToDelete);
        }

        public async Task<IEnumerable<User>> GetAdminUserListAsync(GetAdminList request)
        {
            IQueryable<User> query = _context.Set<User>();

            // Search filtering
            if (!string.IsNullOrEmpty(request.SearchString))
            {
                if (int.TryParse(request.SearchString, out int searchId))
                    query = query.Where(u => u.Id == searchId);
                else
                    query = query.Where(u => u.FullName.Contains(request.SearchString) || u.Username.Contains(request.SearchString));
            }

            // Dynamic Sorting
            if (!string.IsNullOrEmpty(request.ColumnOrder))
                query = query.AddSorting(request);

            // Pagination
            if (request.PageIndex.HasValue && request.PageSize.HasValue)
                query.Paginate(request.PageIndex.Value, request.PageSize.Value);

            return await query.AsNoTracking().ToListAsync();
        }
    }
}
