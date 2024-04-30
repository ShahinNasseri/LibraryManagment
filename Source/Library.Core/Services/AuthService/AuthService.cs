using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.DTOs.Auth.Requests;
using Library.Common.DTOs.Auth.Responses;
using Library.Common.Exceptions;
using Library.Common.Helpers;
using Library.Common.Models.Identity;
using Library.Core.Domain.Entities;
using Library.Core.Interfaces;
using Library.Core.Interfaces.Repositories;
using Library.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Services
{

    public partial class AuthService : IAuthService
    {
        private readonly IUnitOfWork _uow;
        private readonly ITokenService _adminTokenService;

        public AuthService(IUnitOfWork uow, ITokenService adminTokenService)
        {
            _uow = uow;
            _adminTokenService = adminTokenService;
        }

 
        public async Task<AccessTokenModel> Login(LoginRequest request)
        {
            NormalizeCredentials(ref request);

            User user = await EnsureUserExistsByUsernameOrEmailAsync(request.UsernameEmail!);
            ValidatePassword(request, user);

            AccessTokenModel token = GenerateToken(user);
            await UpdateUserRefreshTokenInDatabase(user, token);
            return token;
        }

        public async Task<AccessTokenModel> RefreshToken(RefreshTokenRequest request)
        {
            var user = await GetUserByRefreshTokenAsync(request.RefreshToken);
            ValidateRefreshTokenExpiryTime(user);
            AccessTokenModel token = GenerateToken(user);
            await UpdateUserRefreshTokenInDatabase(user, token);
            return token;
        }
      
        public async Task<GetUserDataResponse> GetUserData(GetUserDataRequest request)
        {
            User user = await GetUserById(request._UserId ?? 0);
            return MapUserForResult(user);
        }


        public async Task<AccessTokenModel> Register(RegisterRequest request)
        {
            try
            {
                await _uow.BeginTransactionAsync();

                NormalizeCredentials(ref request);
                var user = await InsertUserIntoDatabase(request);
                AccessTokenModel token = GenerateToken(user);
                await UpdateUserRefreshTokenInDatabase(user, token);
                await _uow.CommitAsync();
                return token;
            }
            catch (Exception)
            {
                await _uow.RollbackAsync();
                throw;
            }
        }

        public async Task Logout(LogoutRequest request)
        {
            var user = await GetUserById(request._UserId ?? 0);
            await ClearRefreshToken(user);
        }
    
    }
}
