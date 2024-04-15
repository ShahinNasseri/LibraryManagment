using Library.API.Models;
using Library.Common.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using System.Text.Json;

namespace Library.API.ExceptionHandlers
{
    public sealed class NotFoundExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var exceptionType = exception.GetType();
            if (exceptionType is KeyNotFoundException)
            {
                var result = new ApiResult(null, 404, ["Resource not found."]);
                httpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                await httpContext.Response.WriteAsJsonAsync(result, cancellationToken);

                return true;
            }

            return false;
        }
    }
}
