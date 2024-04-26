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
    public class UserPermissionRepository : IUserPermissionRepository
    {
        private readonly DbContext _context;

        public UserPermissionRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserPermission>> GetAllAsync(bool trackEntity = false)
        {
            if (trackEntity)
                return await _context.Set<UserPermission>().ToListAsync();
            else
                return await _context.Set<UserPermission>().AsNoTracking().ToListAsync();
        }
        public async Task<UserPermission?> GetByIdAsync(int id)
        {
            return await _context.Set<UserPermission>().FindAsync(id);
        }

        public async Task<UserPermission> AddAsync(UserPermission entity)
        {
            await _context.Set<UserPermission>().AddAsync(entity);
            return entity;
        }

        public void Update(UserPermission entity)
        {
            _context.Set<UserPermission>().Update(entity);
        }

        public void Delete(UserPermission entity)
        {
            _context.Set<UserPermission>().Remove(entity);
        }
    }
}
