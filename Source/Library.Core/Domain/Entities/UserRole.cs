using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Domain.Entities
{
    public class UserRole
    {
        [ForeignKey("User")]
        public long UserID { get; set; }
        [ForeignKey("Role")]
        public int RoleID { get; set; }
        public virtual required User User { get; set; }
        public virtual required Role Role { get; set; }
    }
}
