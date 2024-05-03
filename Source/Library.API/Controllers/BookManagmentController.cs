using Library.API.Models;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.BookManagment.Requests;
using Library.Common.DTOs.Commons;
using Library.Core.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BookManagmentController : BaseController
    {
        private IAdminManagmentService _adminManagmentService { get; set; }

        public BookManagmentController(IAdminManagmentService adminManagmentService)
        {
            _adminManagmentService = adminManagmentService;
        }

        [HttpPost]
        public async Task<ApiResult> InsertBook([FromBody] InsertBookRequest request)
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
    }
}
