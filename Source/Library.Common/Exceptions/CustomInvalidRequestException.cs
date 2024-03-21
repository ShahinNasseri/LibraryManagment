using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Exceptions
{
    public class CustomInvalidRequestException: Exception
    {
        public CustomInvalidRequestException(): base("Request Is Invalid")
        {
        }

        public CustomInvalidRequestException(string message): base(message)
        {
        }

        public CustomInvalidRequestException(string message, Exception innerException): base(message, innerException)
        {
        }
    }
}
