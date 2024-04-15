using Library.API.Models;
using Library.Common.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Library.API.ExceptionHandlers
{
    public sealed class CustomExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var customExceptionsList = new List<Type>
            {
                typeof(CustomArgumentNullException),
                typeof(CustomInvalidRequestException),
                typeof(CustomNotFoundException),
                typeof(CustomOperationFailException),
                typeof(CustomSecurityException),
                typeof(CustomSecurityTokenException),
                typeof(CustomValidationException),
            };

            Type exceptionType = exception.GetType();
            if (!customExceptionsList.Any(a => a == exceptionType))
            {
                return false;
            }

            var result = new ApiResult(null, 400, [exception.Message]);
            httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            await httpContext.Response.WriteAsJsonAsync(result , cancellationToken);

            return true;
        }
    }
}
