using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Repositories
{
    public interface IPermissionRepository
    {
        Task<Permission> AddAsync(Permission entity);
        void Delete(Permission entity);
        Task<IEnumerable<Permission>> GetAllAsync(bool trackEntity = false);
        Task<Permission?> GetByIdAsync(long id);
        void Update(Permission entity);
    }
}
