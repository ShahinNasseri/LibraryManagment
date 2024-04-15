using Library.API.Models;
using Library.Common.DTOs.AdminAuth.Requests;
using Library.Core.Interfaces.Services;
using Library.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AdminAuthController : AdminBaseController
    {
        private IAdminUserService _adminUserService { get; set; }

        public AdminAuthController(IAdminUserService adminUserService)
        {
            _adminUserService = adminUserService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ApiResult> RegisterAdmin([FromBody] RegisterAdminRequest request)
        {
            Response.Data = await _adminUserService.Register(request);
            return Response;
        }

    }
}
