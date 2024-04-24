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

        public AuthenticatedUser(long userId, string username, string email)
        {
            userId = userId;
            Username = username;
            Email = email;
        }

        public long userId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
