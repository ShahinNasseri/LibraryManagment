using Library.API.Models;
using Library.Common.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace Library.API.ExceptionHandlers
{
    public sealed class InternalExceptionHandler(IHostEnvironment env) : IExceptionHandler
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

            ApiResult? result = null;
            if (env.IsDevelopment())
            {
                result = new ApiResult(null, 500, [exception.Message]);
            }
            else
            {
                result = new ApiResult(null, 500, ["An internal error occurred."]);
            }
            httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await httpContext.Response.WriteAsJsonAsync(result, cancellationToken);

            return true;

           
        }
    }
}
