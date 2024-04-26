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
    

    public class PermissionRepository : IPermissionRepository
    {
        private readonly DbContext _context;

        public PermissionRepository(DbContext context)
        {

            _context = context;
        }


        public async Task<IEnumerable<Permission>> GetAllAsync(bool trackEntity = false)
        {
            if (trackEntity)
                return await _context.Set<Permission>().ToListAsync();
            else
                return await _context.Set<Permission>().AsNoTracking().ToListAsync();
        }

        public async Task<Permission?> GetByIdAsync(long id)
        {
            return await _context.Set<Permission>().FindAsync(id);
        }

        public async Task<Permission> AddAsync(Permission entity)
        {
            await _context.Set<Permission>().AddAsync(entity);
            return entity;
        }

        public void Update(Permission entity)
        {
            _context.Set<Permission>().Update(entity);
        }

        public void Delete(Permission entity)
        {
            _context.Set<Permission>().Remove(entity);
        }
    }
}
