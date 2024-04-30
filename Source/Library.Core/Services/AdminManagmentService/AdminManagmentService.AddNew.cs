using Library.Common.DTOs.AdminManagment.Requests;
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


        private static void NormalizeCredentials(ref AddNewAdminRequest request)
        {
            request.Email = request.Email!.Trim().ToLower();
            request.Username = request.Username!.Trim().ToLower();
        }

        private async Task InsertAdminUserToDatabase(AddNewAdminRequest request)
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
