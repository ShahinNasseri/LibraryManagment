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
   

    public class AdminTokenService : IAdminTokenService
    {
        private readonly JwtSettings _jwtSettings;

        public AdminTokenService(IOptions<Settings> settings)
        {

            var systemSetting = settings.Value ?? throw new CustomArgumentNullException(nameof(settings));
            _jwtSettings = systemSetting.JwtSettings;
            ValidateSettings(_jwtSettings);
        }


        public AccessTokenModel Generate(AuthenticatedAdmin admin)
        {
            var (signingCredentials, encryptingCredentials) = GetCredentials();

            var claims = GetClaims(admin);

            var securityToken = CreateJwtSecurityToken(claims, signingCredentials, encryptingCredentials);
            var refreshToken = GenerateRefreshToken();

            return new AccessTokenModel(securityToken, refreshToken, admin.AdminId);
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

        private IEnumerable<Claim> GetClaims(AuthenticatedAdmin admin)
        {
            // Assume this might involve async operations (e.g., database access)
            return
            [
                new Claim("AdminId", admin.AdminId.ToString()),
                new Claim("Username", admin.Username),
                new Claim("Email", admin.Email)
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
            if (!long.TryParse(claims.FirstOrDefault(c => c.Type == "AdminId")?.Value, out var adminId))
                throw new CustomOperationFailException("AdminId claim is missing or not a valid long.");

            return adminId;
        }

    }
}
