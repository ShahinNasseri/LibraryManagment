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

        public AuthenticatedUser(long userId, string username, string email, string firstName, string lastName)
        {
            UserId = userId;
            Username = username;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
        }

        public long UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
