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
    }
}
