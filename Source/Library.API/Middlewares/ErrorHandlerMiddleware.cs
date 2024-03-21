using Library.Common.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.Net;
using System.Text.Json;
using System.Text;
using Microsoft.IO;

namespace Library.API.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly RecyclableMemoryStreamManager _recyclableMemoryStreamManager;

        public ErrorHandlerMiddleware(RequestDelegate next, RecyclableMemoryStreamManager recyclableMemoryStreamManager)
        {
            _next = next;
            _recyclableMemoryStreamManager = recyclableMemoryStreamManager;
        }

        public async Task Invoke(HttpContext context, Microsoft.AspNetCore.Hosting.IWebHostEnvironment env, IErrorLogService errorLogService)
        {
            try
            {
                context.Request.EnableBuffering(); // Enables buffering with the default size
                await _next(context);
            }
            catch (Exception error)
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

                var response = context.Response;
                if (response.HasStarted)
                {
                    throw; // Prevents writing to the response if it has already started
                }

                response.ContentType = "application/json";
                string responseResult;

                Type exceptionType = error.GetType();
                if (customExceptionsList.Any(a => a == exceptionType))
                {
                    responseResult = await HandleCustomException(context, error, response);
                }
                else if (error is KeyNotFoundException)
                {
                    responseResult = Handle404Exception(context, error, response);
                }
                else
                {
                    responseResult = await HandleInternalException(context, error, response, env, errorLogService);
                }

                await response.WriteAsync(responseResult);
            }
        }

        private async Task<string> HandleCustomException(HttpContext context, Exception error, HttpResponse response)
        {
            response.StatusCode = (int)HttpStatusCode.BadRequest;
            // Serialize directly without intermediate conversion to ApiResult, assuming ApiResult is your custom response model
            return JsonSerializer.Serialize(new ApiResult(null, 400, new string[] { error.Message }));
        }

        private string Handle404Exception(HttpContext context, Exception error, HttpResponse response)
        {
            response.StatusCode = (int)HttpStatusCode.NotFound;
            return JsonSerializer.Serialize(new ApiResult(null, 404, new string[] { "Resource not found." }));
        }

        private async Task<string> HandleInternalException(HttpContext context, Exception error, HttpResponse response, Microsoft.AspNetCore.Hosting.IWebHostEnvironment env, IErrorLogService errorLogService)
        {
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var errorModel = GenerateErrorModel(context, error);
            await errorLogService.InsertAsync(errorModel); // Assume InsertAsync is the correct async method

            if (env.IsDevelopment())
            {
                return JsonSerializer.Serialize(new ApiResult(null, 500, new string[] { error.Message }));
            }
            else
            {
                return JsonSerializer.Serialize(new ApiResult(null, 500, new string[] { "An internal error occurred." }));
            }
        }

        private string ReadHttpPostBodyData(HttpContext context)
        {
            if (context.Request.Method != "POST")
            {
                return string.Empty;
            }

            using var stream = _recyclableMemoryStreamManager.GetStream();
            context.Request.Body.Seek(0, SeekOrigin.Begin);
            context.Request.Body.CopyTo(stream);
            var requestBody = Encoding.UTF8.GetString(stream.ToArray());
            context.Request.Body.Seek(0, SeekOrigin.Begin);
            return requestBody;
        }

        private ErrorLog GenerateErrorModel(HttpContext context, Exception error)
        {
            var st = new StackTrace(error, true);
            var frame = st.GetFrames()?.FirstOrDefault(f => f.GetFileLineNumber() > 0);

            return new ErrorLog
            {
                Action = context.Request.RouteValues["action"]?.ToString(),
                Controller = context.Request.RouteValues["controller"]?.ToString(),
                BodyData = ReadHttpPostBodyData(context),
                DateTime = DateTime.UtcNow,
                ErrorMessage = error.Message,
                InnerException = error.InnerException?.ToString(),
                Line = frame?.GetFileLineNumber().ToString(),
                Page = frame?.GetFileName(),
                Method = frame?.GetMethod()?.Name,
            };
        }
    }
}
