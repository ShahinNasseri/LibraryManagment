using Library.Common.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Services
{
    public interface IUserTokenService
    {
        AccessTokenModel Generate(AuthenticatedUser admin);
        AccessTokenModel GenerateAccessTokenWithClaimsAsync(IEnumerable<Claim> claims);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
