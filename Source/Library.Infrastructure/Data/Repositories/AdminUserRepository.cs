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
    public class AdminUserRepository : IAdminUserRepository
    {
        private readonly DbContext _context;

        public AdminUserRepository(DbContext context)
        {

            _context = context;
        }

        public async Task<IEnumerable<AdminUser>> GetAllAsync()
        {
            return await _context.Set<AdminUser>().ToListAsync();
        }

        public async Task<AdminUser?> GetByIdAsync(long id)
        {
            return await _context.Set<AdminUser>().FindAsync(id);
        }

        public async Task AddAsync(AdminUser entity)
        {
            await _context.Set<AdminUser>().AddAsync(entity);
        }

        public void Update(AdminUser entity)
        {
            _context.Set<AdminUser>().Update(entity);
        }

        public void Delete(AdminUser entity)
        {
            _context.Set<AdminUser>().Remove(entity);
        }
    }
}
