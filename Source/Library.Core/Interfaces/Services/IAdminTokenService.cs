using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Library.Common;
using System.Text;
using System.Threading.Tasks;
using Library.Common.Models.Identity;

namespace Library.Core.Interfaces.Services
{
    public interface IAdminTokenService
    {
        AccessTokenModel Generate(AuthenticatedAdmin admin);
        AccessTokenModel GenerateAccessTokenWithClaimsAsync(IEnumerable<Claim> claims);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
