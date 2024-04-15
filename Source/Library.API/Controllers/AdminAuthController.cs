using Library.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AdminAuthController : AdminBaseController
    {
        private IAdminUserService _adminUserService { get; set; }

        public AdminUserController(IAdminUserService adminUserService)
        {
            _adminUserService = adminUserService;
        }
    }
}
