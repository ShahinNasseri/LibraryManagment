using Library.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Library.API.Attributes
{
    public class ValidateModelStateAttribute: ActionFilterAttribute
    {
        public ValidateModelStateAttribute()
        {
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
             
            }
        }
    }
} 
