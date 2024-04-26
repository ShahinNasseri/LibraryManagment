using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Repositories
{
    public interface IRolePermissionRepository
    {
        Task<RolePermission> AddAsync(RolePermission entity);
        void Delete(RolePermission entity);
        Task<IEnumerable<RolePermission>> GetAllAsync(bool trackEntity = false);
        Task<RolePermission?> GetByIdAsync(int id);
        void Update(RolePermission entity);
    }
}
