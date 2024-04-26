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
    public class UserRoleRepository : IUserRoleRepository
    {
        private readonly DbContext _context;

        public UserRoleRepository(DbContext context)
        {

            _context = context;
        }


        public async Task<IEnumerable<UserRole>> GetAllAsync(bool trackEntity = false)
        {
            if (trackEntity)
                return await _context.Set<UserRole>().ToListAsync();
            else
                return await _context.Set<UserRole>().AsNoTracking().ToListAsync();
        }

        public async Task<UserRole?> GetByIdAsync(int id)
        {
            return await _context.Set<UserRole>().FindAsync(id);
        }

        public async Task<UserRole> AddAsync(UserRole entity)
        {
            await _context.Set<UserRole>().AddAsync(entity);
            return entity;
        }

        public void Update(UserRole entity)
        {
            _context.Set<UserRole>().Update(entity);
        }

        public void Delete(UserRole entity)
        {
            _context.Set<UserRole>().Remove(entity);
        }
    }
}
