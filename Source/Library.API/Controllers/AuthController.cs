using Library.API.Models;
using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Auth.Requests;
using Library.Common.DTOs.Auth.Responses;
using Library.Common.Models.Identity;
using Library.Core.Interfaces.Services;
using Library.Core.Services;
using Library.Core.Services.AdminManagmentService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;

namespace Library.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthController : BaseController
    {
        private IAuthService _authService { get; set; }

        public AuthController(IAuthService adminAuthService)
        {
            _authService = adminAuthService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ApiResult<AccessTokenModel>> Login([FromBody] LoginRequest request)
        {
            var Response = new ApiResult<AccessTokenModel>(await _authService.Login(request));
            return Response;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ApiResult<AccessTokenModel>> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var Response = new ApiResult<AccessTokenModel>(await _authService.RefreshToken(request));
            return Response;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ApiResult<AccessTokenModel>> Register([FromBody] RegisterRequest request)
        {
            var Response = new ApiResult<AccessTokenModel>(await _authService.Register(request));
            return Response;
        }

        [HttpPost]
        public async Task<ApiResult> Logout([FromBody] LogoutRequest request)
        {
            await _authService.Logout(request);
            return new ApiResult(null);
        }

        [HttpPost]
        public async Task<ApiResult<GetUserDataResponse>> GetUserData([FromBody] GetUserDataRequest request)
        {
            var Response = new ApiResult<GetUserDataResponse>(await _authService.GetUserData(request));
            return Response;
        }
    }
}
