using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.DTOs.Commons
{
    public class EntityList: UserIdentity
    {
        public string? SearchString { get; set; }
        public string? ColumnOrder { get; set; }
        public SortOrder SortOrder { get; set; } = SortOrder.Ascending;
        public int? PageIndex { get; set; }
        public int? PageSize { get; set; }
    }

    public enum SortOrder
    {
        Ascending = 1,
        Descending = 2,
    }
}
