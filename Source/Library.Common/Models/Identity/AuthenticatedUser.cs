using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Models.Identity
{
    public class AuthenticatedUser
    {
        public AuthenticatedUser()
        {

        }

        public AuthenticatedUser(long userId, string username, string email, bool isAdmin)
        {
            userId = userId;
            Username = username;
            Email = email;
            IsAdmin = isAdmin;
        }

        public long UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
    }
}
