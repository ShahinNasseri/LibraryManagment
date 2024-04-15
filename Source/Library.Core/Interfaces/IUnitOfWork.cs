using Library.Core.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces
{
    public interface IUnitOfWork
    {
        IAdminUserRepository Admins { get; }
        IUserRepository Users { get; }

        Task BeginTransactionAsync();
        Task CommitAsync();
        Task<int> CompleteAsync();
        void Dispose();
        Task RollbackAsync();
    }
}
