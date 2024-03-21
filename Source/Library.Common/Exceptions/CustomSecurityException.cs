using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Exceptions
{
    public class CustomSecurityException: Exception
    {
        public CustomSecurityException(): base()
        {
        }

        public CustomSecurityException(string message): base(message)
        {
        }

        public CustomSecurityException(string message, Exception innerException): base(message, innerException)
        {
        }
    }
}
