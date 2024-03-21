using Library.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Library.API.Attributes
{
    public enum TokenType
    {
        AdminPanel,
        Application
    }

    public class VidayarAuthorizationAttribute : ActionFilterAttribute, IAuthorizationFilter
    {
        private readonly TokenType _tokenType;

        public VidayarAuthorizationAttribute(TokenType tokenType)
        {
            _tokenType = tokenType;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.HttpContext.User.Identity is ClaimsIdentity identity)
            {
                if (HasAllowAnonymous(context) || !IsIdentityValid(identity))
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
                FirstName = identity.FindFirst("FirstName")?.Value,
                LastName = identity.FindFirst("LastName")?.Value,
                Email = identity.FindFirst("Email")?.Value,
                Username = identity.FindFirst("Username")?.Value,
            };
        }

        private IEnumerable<Claim>? GetClaimsBasedOnTokenType(ClaimsIdentity identity)
        {
            return _tokenType switch
            {
                TokenType.Application => [
                    new Claim("UserId", identity.FindFirst("UserId")?.Value),
                    new Claim("FirstName", identity.FindFirst("FirstName")?.Value),
                    new Claim("LastName", identity.FindFirst("LastName")?.Value),
                    new Claim("Username", identity.FindFirst("Username")?.Value),
                    new Claim("Email", identity.FindFirst("Email")?.Value)
                                ],
                TokenType.AdminPanel => [
                                    new Claim("AdminId", identity.FindFirst("AdminId")?.Value),
                    new Claim("Username", identity.FindFirst("Username")?.Value),
                    new Claim("Email", identity.FindFirst("Email")?.Value)
                                ],
                _ => null,
            };
        }
    }
}
