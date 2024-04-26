using Library.Core.Domain.Entities;

namespace Library.Core.Domain.Repositories
{
    public interface IRoleRepository
    {
        Task<Role> AddAsync(Role entity);
        void Delete(Role entity);
        Task<IEnumerable<Role>> GetAllAsync(bool trackEntity = false);
        Task<Role?> GetByIdAsync(int id);
        void Update(Role entity);
    }
}