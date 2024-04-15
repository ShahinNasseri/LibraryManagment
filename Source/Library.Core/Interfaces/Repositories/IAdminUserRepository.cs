using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Repositories
{
    public interface IAdminUserRepository
    {
        Task AddAsync(AdminUser entity);
        void Delete(AdminUser entity);
        Task<IEnumerable<AdminUser>> GetAllAsync();
        Task<AdminUser?> GetByIdAsync(long id);
        void Update(AdminUser entity);
    }
}
