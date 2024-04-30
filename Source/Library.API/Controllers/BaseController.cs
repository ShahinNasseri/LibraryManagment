using Library.API.Attributes;
using Library.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    [ValidateModelState]
    [LibraryAuthorization]
    [FillIdentityProps]
    [ApiController]
    public class BaseController : ControllerBase
    {
        public BaseController()
        {
        }
    }
}
