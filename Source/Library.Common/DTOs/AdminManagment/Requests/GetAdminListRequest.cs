using Library.Common.DTOs.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.DTOs.AdminManagment.Requests
{
    public class GetAdminListRequest: EntityList
    {
        public long UserId { get; set; }
    }
}
