using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Models.Identity
{
    public class AuthenticatedAdmin
    {
        public AuthenticatedAdmin()
        {

        }

        public AuthenticatedAdmin(long adminId, string username, string email)
        {
            AdminId = adminId;
            Username = username;
            Email = email;
        }

        public long AdminId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
