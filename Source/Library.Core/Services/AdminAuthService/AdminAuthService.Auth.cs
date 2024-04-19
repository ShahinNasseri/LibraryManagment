using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.Models.Identity;
using Library.Core.Domain.Entities;
using Library.Common.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Services
{
    public partial class AdminAuthService
    {
        public async Task<AccessTokenModel> Login(LoginAdminRequest request)
        {
            NormalizeCredentials(ref request);

            AdminUser admin = await GetAdminByUsernameOrEmail(request.UsernameEmail!);
            AccessTokenModel token = GenerateToken(admin);
            await UpdateAdminRefreshTokenInDatabase(admin, token);
            return token;
        }

        private async Task<AdminUser> GetAdminByUsernameOrEmail(string usernameOrEmail)
        {
            var admin = await _uow.Admins.GetByEmailAsync(usernameOrEmail);

            if (admin is null)
                throw new CustomInvalidRequestException("Invalid Login Credentials. Please check your username and password and try again.");

            return admin;
        }

        /// <summary>
        /// Convert LoginAdminRequest Model UsernameOrPassword to LowerCase Becuse We Only Store LowerCase Username Or Password
        /// </summary>
        /// <param name="request">LoginAdminRequest With UsernameEmail properties</param>
        private static void NormalizeCredentials(ref LoginAdminRequest request)
        {
            request.UsernameEmail = request.UsernameEmail!.Trim().ToLower();
        }

        private AccessTokenModel GenerateToken(AdminUser admin)
        {
            var authenticatedAdmin = new AuthenticatedAdmin()
            {
                AdminId = admin.Id,
                Email = admin.Email,
                Username = admin.Username,
            };
            var token = _adminTokenService.Generate(authenticatedAdmin);
            return token;
        }
        private async Task UpdateAdminRefreshTokenInDatabase(AdminUser admin, AccessTokenModel token)
        {
            if (string.IsNullOrWhiteSpace(token.RefreshToken))
                throw new CustomArgumentNullException("Refresh Token is not valid");

            admin.RefreshToken = token.RefreshToken;
            _uow.Admins.Update(admin);
            await _uow.CompleteAsync();
        }
    }
}
