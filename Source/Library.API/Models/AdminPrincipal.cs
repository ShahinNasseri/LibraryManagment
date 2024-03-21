using System.Security.Claims;

namespace Library.API.Models
{
    public class AdminPrincipal: ClaimsPrincipal
    {
        public AdminPrincipal(ClaimsIdentity identity) : base(identity) { }

        public AdminPrincipal() { }

        /// <summary>
        /// Admin Id
        /// </summary>
        public long AdminId { get; set; }

        /// <summary>
        /// Username
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Email of user
        /// </summary>
        public string Email { get; set; }
    }
}
