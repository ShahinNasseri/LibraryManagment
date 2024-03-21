using Library.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    public class AdminBaseController : ControllerBase
    {
        protected ApiResult Response;
        public AdminBaseController()
        {
            Response = new ApiResult(null);
        }
    }
}
