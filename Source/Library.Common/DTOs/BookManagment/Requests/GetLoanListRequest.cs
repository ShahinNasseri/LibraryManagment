using Library.Common.DTOs.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.DTOs.BookManagment.Requests
{
    public class GetLoanListRequest: EntityList
    {
        public long? UserId { get; set; }
        public int? LoanId { get; set; }
        public bool? IsReturned { get; set; }
        public bool? IsOverDue { get; set; }
    }
}
