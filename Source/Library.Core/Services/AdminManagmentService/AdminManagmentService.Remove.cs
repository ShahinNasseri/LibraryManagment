using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Commons;
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
        private async Task DeleteUserByIdsAsync(string adminIds)
        {
            await _uow.Users.DeleteRangeAsync(adminIds);
            await _uow.SaveChangesAsync();
        }

        private static void ValidateAdminDeletion(EntityIds request)
        {
            // Convert the string of IDs into a list of integers
            var idsToDelete = request.Ids.Split(',').Select(long.Parse).ToList();
            long requestedUserId = request._UserId.Value;

            if (idsToDelete.Contains(requestedUserId))
            { 
                throw new CustomOperationFailException("Users cannot delete themselvs");
            }
        }
    }
}
