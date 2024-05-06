using Library.Common.DTOs.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.DTOs.BookManagment.Requests
{
    public class GetBooksListRequest: EntityList
    {
        public int? BookId { get; set; }
        public bool? inLoan { get; set; }
        public bool? FreeBooks { get; set; }
    }
}
