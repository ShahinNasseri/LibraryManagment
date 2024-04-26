using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Repositories
{
    public interface IUserRoleRepository
    {
        Task<UserRole> AddAsync(UserRole entity);
        void Delete(UserRole entity);
        Task<IEnumerable<UserRole>> GetAllAsync(bool trackEntity = false);
        Task<UserRole?> GetByIdAsync(int id);
        void Update(UserRole entity);
    }
}
