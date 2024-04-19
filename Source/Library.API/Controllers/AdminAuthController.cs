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
    public class AdminAuthController : AdminBaseController
    {
        private IAdminAuthService _adminAuthService { get; set; }

        public AdminAuthController(IAdminAuthService adminAuthService)
        {
            _adminAuthService = adminAuthService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ApiResult> Login([FromBody] LoginAdminRequest request)
        {
            Response.Data = await _adminAuthService.Login(request);
            return Response;
        }


    }
}
