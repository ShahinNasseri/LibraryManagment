using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.Exceptions;
using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Services.AdminManagmentService
{
    public partial class AdminManagmentService
    {
        private async void RemoveAdminInDatabase(AdminUser admin)
        {
            _uow.Admins.Delete(admin);
            var rowEffectedCount = await _uow.CompleteAsync();
            if (rowEffectedCount == 0)
                throw new CustomOperationFailException("The admin account you are trying to delete does not exist.");
        }

        private async Task<AdminUser> GetAdminById(long adminId)
        {
            

            var admin = await _uow.Admins.GetByIdAsync(adminId);
            if (admin is null)
                throw new CustomInvalidRequestException();
            return admin;
        }

        private static void ValidateAdminDeletion(RemoveAdminRequest request)
        {
            if (request.Id == request.AdminId)
            { 
                throw new CustomOperationFailException("User cannot delete themself");
            }
        }
    }
}
