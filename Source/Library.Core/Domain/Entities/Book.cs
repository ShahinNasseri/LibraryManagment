using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Domain.Entities
{
    public class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string? Isbn { get; set; }
        public int? PublicationYear { get; set; }
        public string? Publisher { get; set; }
        public string? Genre { get; set; }
        public string? Summary { get; set; }
        public ICollection<Loan> Loan { get; set; } = [];
    }
}
