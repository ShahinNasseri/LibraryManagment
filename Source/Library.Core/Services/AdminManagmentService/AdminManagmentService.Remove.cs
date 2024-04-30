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
        private async void RemoveAdminInDatabase(User admin)
        {
            _uow.Users.Delete(admin);
            var rowEffectedCount = await _uow.SaveChangesAsync();
            if (rowEffectedCount == 0)
                throw new CustomOperationFailException("The admin account you are trying to delete does not exist.");
        }

        private async Task<User> GetAdminById(long adminId)
        {
            

            var admin = await _uow.Users.GetByIdAsync(adminId);
            if (admin is null)
                throw new CustomInvalidRequestException();
            return admin;
        }

        private static void ValidateAdminDeletion(User user, RemoveAdminRequest request)
        {
            if (user.Id == request._UserId)
            { 
                throw new CustomOperationFailException("User cannot delete themselvs");
            }

            if(user.IsAdmin == false)
            {
                throw new CustomOperationFailException("The Selected User Is not admin");
            }
        }
    }
}
