using Library.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Library.API.Attributes
{
    public class ValidateModelStateAttribute: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var modelStateEntries = context.ModelState.Values;
                List<string> errors = new List<string>();
                foreach (var item in modelStateEntries)
                {
                    foreach (var error in item.Errors)
                    {
                        errors.Add(error.ErrorMessage);
                    }
                }

                ApiResult resultObject = new ApiResult(null, StatusCodes.Status400BadRequest, errors.ToArray());
                context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Result = new JsonResult(resultObject);
            }
        }
    }
} 
