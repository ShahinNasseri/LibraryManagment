using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.Helpers;
using Library.Core.Domain.Entities;
using Library.Core.Interfaces;
using Library.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using Library.Common.Exceptions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Common.DTOs.Commons;
using System.Linq.Expressions;
using System.Reflection;
using System.Collections;

namespace Library.Core.Services.AdminManagmentService
{
    public partial class AdminManagmentService: IAdminManagmentService
    {
        private readonly IUnitOfWork _uow;
        public AdminManagmentService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task AddNewAdmin(AddNewAdminRequest request)
        {
            NormalizeCredentials(ref request);
            AccessValidation(request);
            await InsertAdminUserToDatabaseAsync(request);
        }

        public async Task RemoveAdmin(EntityIds request)
        {
            await DeleteUserByIdsAsync(request.Ids);
        }

        public async Task DeactiveAdmin(EntityId request)
        {
            User? admin = await GetAdminById(request._UserId.Value);
            ValidateForDeactive(request, admin);
            await DeActiveUserAsync(admin);
        }

        public async Task<IEnumerable<User>> GetAdminList(GetAdminList request)
        {
            return await _uow.Users.GetAdminUserListAsync(request);
        }
    }
}
