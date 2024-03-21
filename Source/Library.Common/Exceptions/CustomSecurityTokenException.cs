using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Exceptions
{
    public class CustomSecurityTokenException: Exception
    {
        public CustomSecurityTokenException(): base()
        {
        }

        public CustomSecurityTokenException(string message): base(message)
        {
        }

        public CustomSecurityTokenException(string message, Exception innerException): base(message, innerException)
        {
        }
    }
}
