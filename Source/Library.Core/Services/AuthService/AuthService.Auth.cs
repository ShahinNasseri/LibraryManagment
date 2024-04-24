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
    public partial class AuthService
    {
        public async Task<AccessTokenModel> Login(LoginRequest request)
        {
            NormalizeCredentials(ref request);

            User admin = await GetAdminByUsernameOrEmail(request.UsernameEmail!);
            AccessTokenModel token = GenerateToken(admin);
            await UpdateAdminRefreshTokenInDatabase(admin, token);
            return token;
        }

        private async Task<User> GetAdminByUsernameOrEmail(string usernameOrEmail)
        {
            var admin = await _uow.Users.GetByEmailAsync(usernameOrEmail);

            if (admin is null)
                throw new CustomInvalidRequestException("Invalid Login Credentials. Please check your username and password and try again.");

            return admin;
        }

        /// <summary>
        /// Convert LoginAdminRequest Model UsernameOrPassword to LowerCase Becuse We Only Store LowerCase Username Or Password
        /// </summary>
        /// <param name="request">LoginAdminRequest With UsernameEmail properties</param>
        private static void NormalizeCredentials(ref LoginRequest request)
        {
            request.UsernameEmail = request.UsernameEmail!.Trim().ToLower();
        }

        private AccessTokenModel GenerateToken(User user)
        {
            var authenticatedAdmin = new AuthenticatedUser()
            {
                userId = user.Id,
                Email = user.Email,
                Username = user.Username,
            };
            var token = _adminTokenService.Generate(authenticatedAdmin);
            return token;
        }
        private async Task UpdateAdminRefreshTokenInDatabase(User user, AccessTokenModel token)
        {
            if (string.IsNullOrWhiteSpace(token.RefreshToken))
                throw new CustomArgumentNullException("Refresh Token is not valid");

            user.RefreshToken = token.RefreshToken;
            _uow.Users.Update(user);
            await _uow.CompleteAsync();
        }
    }
}
