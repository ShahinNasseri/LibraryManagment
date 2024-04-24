using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Domain.Entities
{
    public class UserPermission
    {
        [ForeignKey("User")]
        public long UserID { get; set; }
        public int PermissionID { get; set; }
        public string PermissionText { get; set; } // Cached copy of PermissionName for quick access
        public virtual required User User { get; set; }

    }
}
