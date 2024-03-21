using System.Security.Claims;

namespace Library.API.Models
{
    public class UserPrincipal : ClaimsPrincipal
    {
        public UserPrincipal(ClaimsIdentity identity) : base(identity) { }

        public UserPrincipal() { }

        /// <summary>
        /// User Id
        /// </summary>
        public long UserId { get; set; }

        /// <summary>
        /// Username
        /// </summary>
        public string Username { get; set; }


        /// <summary>
        /// FirstName of user
        /// </summary>
        public string? FirstName { get; set; }

        /// <summary>
        /// FirstName of user
        /// </summary>
        public string? LastName { get; set; }

        /// <summary>
        /// Email of user
        /// </summary>
        public string Email { get; set; }
    }
}
