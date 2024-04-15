using Library.API.Attributes;
using Library.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    [ValidateModelState]
    [VidayarAuthorization(TokenType.AdminPanel)]
    [FillIdentityProps]
    [ApiController]
    public class AdminBaseController : ControllerBase
    {
        protected new ApiResult Response;
        public AdminBaseController()
        {
            Response = new ApiResult(null);
        }
    }
}
