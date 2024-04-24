using Library.API.Models;
using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Core.Interfaces.Services;
using Library.Core.Services;
using Library.Core.Services.AdminManagmentService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ApiResult> Login([FromBody] LoginRequest request)
        {
            Response.Data = await _authService.Login(request);
            return Response;
        }


    }
}
