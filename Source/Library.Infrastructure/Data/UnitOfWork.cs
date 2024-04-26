using Library.Core.Domain.Entities;
using Library.Core.Domain.Repositories;
using Library.Core.Interfaces;
using Library.Core.Interfaces.Repositories;
using Library.Infrastructure.Data.Contexts;
using Library.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Infrastructure.Data
{

    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private IDbContextTransaction? _currentTransaction;
        public IUserRepository Users { get; private set; }
        public IRolePermissionRepository RolePermission { get; private set; }
        public IPermissionRepository Permissions { get; private set; }
        public IRoleRepository Roles { get; private set; }
        public IUserPermissionRepository UserPermissions { get; private set; }
        public IUserRoleRepository UserRoles { get; private set; }


        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Users = new UserRepository(context);
            RolePermission = new RolePermissionRepository(context);
            Permissions = new PermissionRepository(context);
            Roles = new RoleRepository(context);
            UserPermissions = new UserPermissionRepository(context);
            UserRoles = new UserRoleRepository(context);
            // Initialize other repositories similarly
        }


        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            if (_currentTransaction != null)
            {
                return; // A transaction is already started
            }

            _currentTransaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
                await _currentTransaction!.CommitAsync();
            }
            catch
            {
                await RollbackAsync();
                throw;
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public async Task RollbackAsync()
        {
            try
            {
                if (_currentTransaction != null)
                {
                    await _currentTransaction.RollbackAsync();
                }
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
