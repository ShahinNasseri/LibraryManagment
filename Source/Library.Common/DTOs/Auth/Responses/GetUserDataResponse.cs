using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.DTOs.Auth.Responses
{
    public class GetUserDataResponse
    {
        public long Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }

    }
}
