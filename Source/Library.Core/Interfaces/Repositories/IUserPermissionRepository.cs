using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Repositories
{
    public interface IUserPermissionRepository
    {
        Task<UserPermission> AddAsync(UserPermission entity);
        void Delete(UserPermission entity);
        Task<IEnumerable<UserPermission>> GetAllAsync(bool trackEntity = false);
        Task<UserPermission?> GetByIdAsync(int id);
        void Update(UserPermission entity);
    }
}
