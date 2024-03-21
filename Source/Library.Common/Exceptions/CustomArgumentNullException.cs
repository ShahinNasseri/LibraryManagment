using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Exceptions
{
    public class CustomArgumentNullException : Exception
    {
        public CustomArgumentNullException(): base()
        {
        }

        public CustomArgumentNullException(string message): base(message)
        {
        }

        public CustomArgumentNullException(string message, Exception innerException): base(message, innerException)
        {
        }
    }
}
