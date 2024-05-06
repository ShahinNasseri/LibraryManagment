using Library.Common.DTOs.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.DTOs.BookManagment.Requests
{
    public class BorrowBookRequest: UserIdentity
    {
        public int BookId { get; set; }
        public DateTime ReturnDate { get; set; }
        public long? UserId { get; set; }
    }
}
