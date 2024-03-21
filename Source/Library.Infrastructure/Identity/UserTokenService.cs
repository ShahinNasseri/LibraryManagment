using Library.Common.Configuration;
using Library.Common.Exceptions;
using Library.Common.Models.Identity;
using Library.Core.Interfaces.Services;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Library.Infrastructure.Identity
{
    public class UserTokenService : IUserTokenService
    {
        private readonly JwtSettings _jwtSettings;

        public UserTokenService(IOptions<Settings> settings)
        {
            var systemSetting = settings.Value ?? throw new CustomArgumentNullException(nameof(settings));
            _jwtSettings = systemSetting.JwtSettings;
            ValidateSettings(_jwtSettings);
        }


        public AccessTokenModel Generate(AuthenticatedUser user)
        {
            var (signingCredentials, encryptingCredentials) = GetCredentials();

            var claims = GetClaims(user);

            var securityToken = CreateJwtSecurityToken(claims, signingCredentials, encryptingCredentials);
            var refreshToken = GenerateRefreshToken();

            return new AccessTokenModel(securityToken, refreshToken, user.UserId);
        }

        private JwtSecurityToken CreateJwtSecurityToken(IEnumerable<Claim> claims, SigningCredentials signingCredentials, EncryptingCredentials encryptingCredentials)
        {
            var now = DateTime.UtcNow;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                IssuedAt = now,
                Expires = now.AddMinutes(_jwtSettings.ExpirationMinutes),
                SigningCredentials = signingCredentials,
                EncryptingCredentials = encryptingCredentials,
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
        }

        public AccessTokenModel GenerateAccessTokenWithClaimsAsync(IEnumerable<Claim> claims)
        {
            var (signingCredentials, encryptingCredentials) = GetCredentials();

            var securityToken = CreateJwtSecurityToken(claims, signingCredentials, encryptingCredentials);
            var refreshToken = GenerateRefreshToken();
            var adminId = ExtractAdminId(claims);

            return new AccessTokenModel(securityToken, refreshToken, adminId);
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true, //you might want to validate the audience and issuer depending on your use case
                ValidAudience = _jwtSettings.Audience,
                ValidateIssuer = true,
                ValidIssuer = _jwtSettings.Issuer,
                RequireExpirationTime = true,
                RequireSignedTokens = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey)),
                TokenDecryptionKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.EncryptKey)),
                ValidateLifetime = false  //here we are saying that we don't care about the token's expiration date
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);

            if (!(validatedToken is JwtSecurityToken jwtToken) ||
                !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private IEnumerable<Claim> GetClaims(AuthenticatedUser user)
        {
            // Assume this might involve async operations (e.g., database access)
            return
            [
                new Claim("UserId", user.UserId.ToString()),
                new Claim("Username", user.Username),
                new Claim("Email", user.Email)
            ];
        }


        private void ValidateSettings(JwtSettings settings)
        {
            if (settings.ExpirationMinutes <= 0)
                throw new ArgumentException("ExpirationMinutes must be greater than zero.", nameof(settings));

            if (string.IsNullOrWhiteSpace(settings.Issuer) || string.IsNullOrWhiteSpace(settings.Audience))
                throw new ArgumentException("Issuer and Audience must be set.", nameof(settings));

            if (settings.SecretKey.Length < 16 || settings.EncryptKey.Length != 16)
                throw new ArgumentException("SecretKey must be at least 16 characters long, and EncryptKey must be exactly 16 characters", nameof(settings));
        }

        private (SigningCredentials, EncryptingCredentials) GetCredentials()
        {
            var secretKey = Encoding.UTF8.GetBytes(_jwtSettings.SecretKey);
            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature);

            var encryptionKey = Encoding.UTF8.GetBytes(_jwtSettings.EncryptKey);
            var encryptingCredentials = new EncryptingCredentials(new SymmetricSecurityKey(encryptionKey), SecurityAlgorithms.Aes128KW, SecurityAlgorithms.Aes128CbcHmacSha256);

            return (signingCredentials, encryptingCredentials);
        }


        private long ExtractAdminId(IEnumerable<Claim> claims)
        {
            if (!long.TryParse(claims.FirstOrDefault(c => c.Type == "UserId")?.Value, out var userId))
                throw new CustomOperationFailException("UserId claim is missing or not a valid long.");

            return userId;
        }
    }
}
