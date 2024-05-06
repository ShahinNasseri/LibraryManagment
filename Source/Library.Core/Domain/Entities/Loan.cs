using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Domain.Entities
{
    public class Loan
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }

        public long UserId { get; set; }
        public User User { get; set; }

        public DateTime LoanDate { get; set; }
        public DateTime? ReturnDate { get; set; } // nullable for unreturned books
        public bool Returned { get; set; }
    }
}
