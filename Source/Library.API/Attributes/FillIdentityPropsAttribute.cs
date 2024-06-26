﻿using Library.API.Models;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Library.API.Attributes
{
    public class FillIdentityPropsAttribute : ActionFilterAttribute
    {
        public override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var userPrincipal = context.HttpContext.User as UserPrincipal;
            var adminPrincipal = context.HttpContext.User as AdminPrincipal;

            var requestModel = context.ActionArguments.Values.FirstOrDefault();
            var modelType = requestModel?.GetType();
            var props = modelType?.GetProperties();

            if (modelType != null && props != null)
            {
                foreach (var prop in props)
                {
                    // Check if the principal is a UserPrincipal and the property name is "UserId"
                    if (userPrincipal != null && prop.Name.ToLower() == "_userid")
                    {
                        prop.SetValue(requestModel, userPrincipal.UserId);
                    }

                    // Check if the principal is a UserPrincipal and the property name is "userisAdmin"
                    if (userPrincipal != null && prop.Name.ToLower() == "_userisadmin")
                    {
                        prop.SetValue(requestModel, userPrincipal.IsAdmin);
                    }
                }

                context.ActionArguments[context.ActionArguments.Keys.FirstOrDefault()] = requestModel;
            }

            return base.OnActionExecutionAsync(context, next);
        }
    }
}
