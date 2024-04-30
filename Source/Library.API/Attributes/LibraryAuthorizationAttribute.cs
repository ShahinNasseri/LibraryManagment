using Library.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Library.API.Attributes
{

    public class LibraryAuthorizationAttribute : ActionFilterAttribute, IAuthorizationFilter
    {

        public LibraryAuthorizationAttribute()
        {
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.HttpContext.User.Identity is ClaimsIdentity identity)
            {
                if (HasAllowAnonymous(context))
                {
                    return;
                }

                if (!IsIdentityValid(identity))
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }

                try
                {
                    var userPrincipal = CreateUserPrincipal(identity);
                    if (userPrincipal == null || string.IsNullOrWhiteSpace(userPrincipal.Email))
                    {
                        context.Result = new UnauthorizedResult();
                        return;
                    }

                    context.HttpContext.User = userPrincipal;
                }
                catch
                {
                    context.Result = new UnauthorizedResult();
                }
            }
        }

        private static bool HasAllowAnonymous(AuthorizationFilterContext context)
        {
            return context.ActionDescriptor.EndpointMetadata.Any(em => em is AllowAnonymousAttribute);
        }

        private static bool IsIdentityValid(ClaimsIdentity identity)
        {
            return identity.IsAuthenticated && identity.Claims.Any();
        }

        private UserPrincipal? CreateUserPrincipal(ClaimsIdentity identity)
        {
            var claims = GetClaimsBasedOnTokenType(identity);
            if (claims == null)
                return null;

            var userIdValue = identity.FindFirst("UserId")?.Value;
            if (!int.TryParse(userIdValue, out var userId))
                return null;

            return new UserPrincipal(new ClaimsIdentity(claims, identity.AuthenticationType))
            {
                UserId = userId,
                Email = identity.FindFirst("Email")!.Value,
                Username = identity.FindFirst("Username")!.Value,
                IsAdmin = bool.Parse(identity.FindFirst("IsAdmin")!.Value)
            };
        }

        private IEnumerable<Claim>? GetClaimsBasedOnTokenType(ClaimsIdentity identity)
        {
            return [
                    new Claim("UserId", identity.FindFirst("UserId")!.Value),
                    new Claim("Username", identity.FindFirst("Username")!.Value),
                    new Claim("Email", identity.FindFirst("Email")!.Value),
                    new Claim("", identity.FindFirst("IsAdmin")!.Value),
                  ];
        }
    }
}
