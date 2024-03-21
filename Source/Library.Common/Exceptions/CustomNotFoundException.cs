using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Exceptions
{
    public class CustomNotFoundException: Exception
    {
        public CustomNotFoundException(): base()
        {
        }

        public CustomNotFoundException(string message): base(message)
        {
        }

        public CustomNotFoundException(string message, Exception innerException): base(message, innerException)
        {
        }

        public CustomNotFoundException(string name, object key): base($"Entity \"{name}\" ({key}) was not found.")
        {
        }
    }
}
