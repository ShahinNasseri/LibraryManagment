using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Models.Identity
{
    public class AccessTokenModel
    {
        public long Id { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string TokenType { get; set; }
        public int ExpiresIn { get; set; }

        public AccessTokenModel()
        {

        }
        public AccessTokenModel(JwtSecurityToken securityToken, string refreshToken, long id)
        {
            AccessToken = new JwtSecurityTokenHandler().WriteToken(securityToken);
            TokenType = "Bearer";
            ExpiresIn = (int)(securityToken.ValidTo - DateTime.UtcNow).TotalSeconds;
            RefreshToken = refreshToken;
            Id = id;
        }

        public static implicit operator List<object>(AccessTokenModel v)
        {
            throw new NotImplementedException();
        }
    }
}
