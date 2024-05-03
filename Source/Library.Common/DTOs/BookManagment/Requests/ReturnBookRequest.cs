using Library.Common.DTOs.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.DTOs.BookManagment.Requests
{
    public class ReturnBookRequest: UserIdentity
    {
        public int LoanId { get; set; }
    }
}
