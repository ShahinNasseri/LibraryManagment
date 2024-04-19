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
            await InsertAdminUserToDatabase(request);
        }
        public async Task RemoveAdmin(RemoveAdminRequest request)
        {
            ValidateAdminDeletion(request);
            var admin = await GetAdminById(request.Id);
            RemoveAdminInDatabase(admin);
        }
    }
}
