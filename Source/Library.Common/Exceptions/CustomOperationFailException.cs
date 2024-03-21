using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Exceptions
{
    public class CustomOperationFailException: Exception
    {
        public CustomOperationFailException(): base("The operation has failed")
        {
        }

        public CustomOperationFailException(string message): base(message)
        {
        }

        public CustomOperationFailException(string message, Exception innerException): base(message, innerException)
        {
        }
    }
}
