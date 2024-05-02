using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Commons;
using Library.Common.Exceptions;
using Library.Common.Helpers;
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
        private async Task DeActiveUserAsync(User? admin)
        {
            admin.IsActive = false;
            _uow.Users.Update(admin);
            await _uow.SaveChangesAsync();
        }
        private Task<User?> GetAdminById(long AdminId)
        {
            return _uow.Users.GetByIdAsync(AdminId);
        }
        private static void ValidateForDeactive(EntityId request, User? admin)
        {
            if (admin == null)
                throw new CustomInvalidRequestException("The Selected User is not exsist in database anymore");
            if (admin.Id == request._UserId)
                throw new CustomInvalidRequestException("Users Cannot Deactive Themselvs");
            if (admin.IsAdmin == false)
                throw new CustomInvalidRequestException("The Selected User is not admin");
        }

        private static void AccessValidation(AddNewAdminRequest request)
        {
            if (request._UserIsAdmin == false)
                throw new CustomInvalidRequestException();
        }
        private static void NormalizeCredentials(ref AddNewAdminRequest request)
        {
            request.Email = request.Email!.Trim().ToLower();
            request.Username = request.Username!.Trim().ToLower();
        }

        private async Task InsertAdminUserToDatabaseAsync(AddNewAdminRequest request)
        {
            var (hashPassword, passwordSalt) = GenerateHashPassword(request.Password!);
            var adminModel = new User()
            {
                DateCreated = DateTime.UtcNow,
                Email = request.Email!,
                Username = request.Username!,
                FullName = request.FullName!,
                IsActive = request.IsActive ?? true,
                IsAdmin = true,
                Password = hashPassword,
                Salt = passwordSalt
            };
            await _uow.Users.AddAsync(adminModel);
            await _uow.SaveChangesAsync();
        }

        private static (string, string) GenerateHashPassword(string password)
        {
            var randomSalt = Guid.NewGuid().ToString();
            var hashPassword = GeneratePasswordHashBySalt(password, randomSalt);
            return (hashPassword, randomSalt);
        }

        private static string GeneratePasswordHashBySalt(string password, string salt)
        {
            return SecurityHelper.GenerateHash(password, salt);
        }
    }
}
