using Library.API.Models;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AdminManagmentController : AdminBaseController
    {
        private IAdminManagmentService _adminManagmentService { get; set; }

        public AdminManagmentController(IAdminManagmentService adminManagmentService)
        {
            _adminManagmentService = adminManagmentService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ApiResult> Insert([FromBody] AddNewAdminRequest request)
        {
            await _adminManagmentService.AddNewAdmin(request);
            return Response;
        }
    }
}
