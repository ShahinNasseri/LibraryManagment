using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.Exceptions;
using Library.Common.Helpers;
using Library.Common.Models.Identity;
using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Services
{
    public partial class AdminUserService
    {
        public async Task<AccessTokenModel> Register(RegisterAdminRequest request)
        {
            NormalizeCredentials(request);

            try
            {
                await _uow.BeginTransactionAsync();

                AdminUser admin = await InsertAdminUser(request);
                AccessTokenModel token = GenerateToken(request, admin);
                await UpdateAdminRefreshTokenInDatabase(admin, token);

                await _uow.CommitAsync();
                return token;
            }
            catch (Exception)
            {
                await _uow.RollbackAsync();
                throw;
            }
        }

        private static void NormalizeCredentials(RegisterAdminRequest request)
        {
            request.Email = request.Email!.Trim().ToLower();
            request.Username = request.Username!.Trim().ToLower();
        }

        private async Task UpdateAdminRefreshTokenInDatabase(AdminUser admin, AccessTokenModel token)
        {
            if (string.IsNullOrWhiteSpace(token.RefreshToken))
                throw new CustomArgumentNullException("Refresh Token is not valid");

            admin.RefreshToken = token.RefreshToken;
            _uow.Admins.Update(admin);
            await _uow.CompleteAsync();
        }

        private AccessTokenModel GenerateToken(RegisterAdminRequest request, AdminUser admin)
        {
            var authenticatedAdmin = new AuthenticatedAdmin()
            {
                AdminId = admin.Id,
                Email = request.Email,
                Username = request.Username,
            };
            var token = _adminTokenService.Generate(authenticatedAdmin);
            return token;
        }

        private async Task<AdminUser> InsertAdminUser(RegisterAdminRequest request)
        {
            var (hashPassword, passwordSalt) = GenerateHashPassword(request.Password!);
            var adminModel = new AdminUser()
            {
                DateCreated = DateTime.UtcNow,
                Email = request.Email,
                Username = request.Username,
                FullName = request.FullName!,
                IsActive = request.IsActive ?? true,
                Password = hashPassword,
                Salt = passwordSalt
            };
            var admin = await _uow.Admins.AddAsync(adminModel);
            await _uow.CompleteAsync();
            return admin;
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
