using Library.API.Models;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Library.API.Attributes
{
    public class FillIdentityPropsAttribute : ActionFilterAttribute
    {
        public override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var user = (context.HttpContext.User as UserPrincipal);
            if (user != null)
            {
                var requestModel = context.ActionArguments.Values.FirstOrDefault();

                var modelType = requestModel?.GetType();
                var props = modelType?.GetProperties();
                if (modelType != null && props != null)
                {
                    foreach (var prop in props)
                    {
                        if (prop.Name.ToLower() == "userid")
                        {
                            prop.SetValue(requestModel, user.UserId);
                        }
                    }

                    context.ActionArguments[key: context.ActionArguments.Keys.FirstOrDefault()] = requestModel;
                }

            }
            return base.OnActionExecutionAsync(context, next);
        }
    }
}
