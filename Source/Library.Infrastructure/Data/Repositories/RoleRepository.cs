using Library.Core.Domain.Entities;
using Library.Core.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Infrastructure.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DbContext _context;

        public RoleRepository(DbContext context)
        {

            _context = context;
        }


        public async Task<IEnumerable<Role>> GetAllAsync(bool trackEntity = false)
        {
            if (trackEntity)
                return await _context.Set<Role>().ToListAsync();
            else
                return await _context.Set<Role>().AsNoTracking().ToListAsync();
        }

        public async Task<Role?> GetByIdAsync(int id)
        {
            return await _context.Set<Role>().FindAsync(id);
        }

        public async Task<Role> AddAsync(Role entity)
        {
            await _context.Set<Role>().AddAsync(entity);
            return entity;
        }

        public void Update(Role entity)
        {
            _context.Set<Role>().Update(entity);
        }

        public void Delete(Role entity)
        {
            _context.Set<Role>().Remove(entity);
        }

    }
}
