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
        IUserRepository Users { get; }
        IBookRepository Books { get; }
        ILoanRepository Loans { get; }


        Task BeginTransactionAsync();
        Task CommitAsync();
        Task<int> SaveChangesAsync();
        void Dispose();
        Task RollbackAsync();
    }
}
