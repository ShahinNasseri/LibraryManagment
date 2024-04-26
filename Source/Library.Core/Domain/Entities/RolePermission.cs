using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Domain.Entities
{
    public class RolePermission
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Role")]
        public int RoleID { get; set; }
        [ForeignKey("Permission")]
        public int PermissionID { get; set; }

        public virtual required Permission Permission { get; set; }
        public virtual required Role Role { get; set; }
    }
}
