using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Auth.Requests;
using Library.Common.DTOs.Auth.Responses;
using Library.Common.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Services
{
    public interface IAuthService
    {
        Task<AccessTokenModel> Login(LoginRequest request);
        Task Logout(LogoutRequest request);
        Task<AccessTokenModel> Register(RegisterRequest request);
        Task<AccessTokenModel> RefreshToken(RefreshTokenRequest request);
        Task<GetUserDataResponse> GetUserData(GetUserDataRequest request);
        Task<bool> IsUsernameUniqueAsync(string username, CancellationToken token);
        Task<bool> IsEmailUniqueAsync(string email, CancellationToken token);
    }
}
