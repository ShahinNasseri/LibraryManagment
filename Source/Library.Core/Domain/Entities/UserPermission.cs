using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Domain.Entities
{
    public class UserPermission
    {
        public long UserID { get; set; }
        public int PermissionID { get; set; }
        public string PermissionText { get; set; } // Cached copy of PermissionName for quick access
    }
}
