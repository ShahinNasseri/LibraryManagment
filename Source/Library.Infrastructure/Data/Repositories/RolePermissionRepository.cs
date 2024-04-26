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
    public class RolePermissionRepository : IRolePermissionRepository
    {
        private readonly DbContext _context;

        public RolePermissionRepository(DbContext context)
        {

            _context = context;
        }


        public async Task<IEnumerable<RolePermission>> GetAllAsync(bool trackEntity = false)
        {
            if (trackEntity)
                return await _context.Set<RolePermission>().ToListAsync();
            else
                return await _context.Set<RolePermission>().AsNoTracking().ToListAsync();
        }

        public async Task<RolePermission?> GetByIdAsync(int id)
        {
            return await _context.Set<RolePermission>().FindAsync(id);
        }


        public async Task<RolePermission> AddAsync(RolePermission entity)
        {
            await _context.Set<RolePermission>().AddAsync(entity);
            return entity;
        }

        public void Update(RolePermission entity)
        {
            _context.Set<RolePermission>().Update(entity);
        }

        public void Delete(RolePermission entity)
        {
            _context.Set<RolePermission>().Remove(entity);
        }
    }
}
