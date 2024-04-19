using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.DTOs.UserAuth.Requests
{
    public class LoginUserRequest
    {
        public string? UsernameEmail { get; set; }
        public string? Password { get; set; }
    }
}
