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

        public async Task AddAsync(User entity)
        {
            await _context.Set<User>().AddAsync(entity);
        }

        public void Update(User entity)
        {
            _context.Set<User>().Update(entity);
        }

        public void Delete(User entity)
        {
            _context.Set<User>().Remove(entity);
        }
    }
}
