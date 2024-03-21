using Library.API.Attributes;
using Library.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    [ValidateModelState]
    [VidayarAuthorization(TokenType.Application)]
    [FillIdentityProps]
    public class UserBaseController: ControllerBase
    {
        protected new ApiResult Response;
        public UserBaseController()
        {
            Response = new ApiResult(null);
        }
    }
}
