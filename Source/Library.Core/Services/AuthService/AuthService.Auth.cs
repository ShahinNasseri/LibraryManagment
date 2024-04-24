using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.Models.Identity;
using Library.Core.Domain.Entities;
using Library.Common.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Common.DTOs.Auth.Requests;
using Library.Common.Helpers;

namespace Library.Core.Services
{
    public partial class AuthService
    {
     

        private async Task<User> EnsureUserExistsByUsernameOrEmailAsync(string usernameOrEmail)
        {
            var admin = await _uow.Users.GetByEmailOrUsernameAsync(usernameOrEmail);

            if (admin is null)
                throw new CustomInvalidRequestException("Invalid Login Credentials. Please check your username and password and try again.");

            return admin;
        }

        private async Task<User> InsertUserIntoDatabase(RegisterRequest request)
        {
            var (hashPassword, passwordSalt) = GenerateHashPassword(request.Password!);
            var userModel = new User()
            {
                DateCreated = DateTime.UtcNow,
                Email = request.Email!,
                Username = request.Username!,
                FullName = request.FullName!,
                IsActive = false,
                IsAdmin = false,
                Password = hashPassword,
                Salt = passwordSalt
            };
            var user = await _uow.Users.AddAsync(userModel);
            await _uow.CompleteAsync();
            return user;
        }

        private static void ValidatePassword(LoginRequest request, User admin)
        {
            var requestedPassword = GeneratePasswordHashBySalt(request.Password!, admin.Salt);
            if (requestedPassword != admin.Password)
                throw new InvalidOperationException("Username Or Password is Wrong");
        }

        /// <summary>
        /// Convert LoginAdminRequest Model UsernameOrPassword to LowerCase Becuse We Only Store LowerCase Username Or Email
        /// </summary>
        /// <param name="request">LoginAdminRequest With UsernameEmail properties</param>
        private static void NormalizeCredentials(ref LoginRequest request)
        {
            request.UsernameEmail = request.UsernameEmail!.Trim().ToLower();
        }

        /// <summary>
        /// Convert RegisterRequest Model UserName and Email to LowerCase Becuse We Only Store LowerCase Username Or Email
        /// </summary>
        /// <param name="request">LoginAdminRequest With UsernameEmail properties</param>
        private static void NormalizeCredentials(ref RegisterRequest request)
        {
            request.Username = request.Username!.Trim().ToLower();
            request.Email = request.Email!.Trim().ToLower();
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

        private AccessTokenModel GenerateToken(User user)
        {
            var authenticatedAdmin = new AuthenticatedUser()
            {
                UserId = user.Id,
                Email = user.Email,
                Username = user.Username,
                IsAdmin = user.IsAdmin
            };
            var token = _adminTokenService.Generate(authenticatedAdmin);
            return token;
        }
        private async Task UpdateUserRefreshTokenInDatabase(User user, AccessTokenModel token)
        {
            if (string.IsNullOrWhiteSpace(token.RefreshToken))
                throw new CustomArgumentNullException("Refresh Token is not valid");

            user.RefreshToken = token.RefreshToken;
            _uow.Users.Update(user);
            await _uow.CompleteAsync();
        }
    }
}
