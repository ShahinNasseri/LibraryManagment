using Library.API.Models;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Commons;
using Library.Core.Domain.Entities;
using Library.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AdminManagmentController : BaseController
    {
        private IAdminManagmentService _adminManagmentService { get; set; }

        public AdminManagmentController(IAdminManagmentService adminManagmentService)
        {
            _adminManagmentService = adminManagmentService;
        }

        [HttpPost]
        public async Task<ApiResult> Insert([FromBody] AddNewAdminRequest request)
        {
            await _adminManagmentService.AddNewAdmin(request);
            return new ApiResult(null);
        }

        [HttpPost]
        public async Task<ApiResult> Delete([FromBody] EntityIds request)
        {
            await _adminManagmentService.RemoveAdmin(request);
            return new ApiResult(null);
        }

        [HttpPost]
        public async Task<ApiResult> DeactiveAdmin([FromBody] EntityId request)
        {
            await _adminManagmentService.DeactiveAdmin(request);
            return new ApiResult(null);
        }

        [HttpPost]
        public async Task<ApiResult<User>> ListAdmin([FromBody] GetAdminList request)
        {
            var res = await _adminManagmentService.GetAdminList(request);
            return new ApiResult<User>(res);
        }

    }
}
