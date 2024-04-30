using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Text.Json.Serialization;

namespace Library.API.Models
{
    public class ApiResult : IActionResult
    {
        [JsonPropertyName("errors")]
        public string[] Errors { get; set; }

        [JsonPropertyName("data")]
        public object? Data { get; set; }

        [JsonPropertyName("statusCode")]
        public int? StatusCode { get; set; }

        public ApiResult(object? data, int statusCode = StatusCodes.Status200OK, string[] errors = null)
        {
            Data = data;
            StatusCode = statusCode;
            Errors = errors;
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            await new OkObjectResult(this).ExecuteResultAsync(context);
        }

    }

    public class ApiResult<T> : IActionResult
    {
        [JsonPropertyName("errors")]
        public string[] Errors { get; set; }

        [JsonPropertyName("data")]
        public IEnumerable<T> Data { get; set; }

        [JsonPropertyName("statusCode")]
        public int? StatusCode { get; set; }

        public ApiResult(List<T> data, int statusCode = StatusCodes.Status200OK, string[] errors = null)
        {
            Data = data;
            StatusCode = statusCode;
            Errors = errors;
        }

        public ApiResult(T data, int statusCode = StatusCodes.Status200OK, string[] errors = null)
        {
            Data = [data];
            StatusCode = statusCode;
            Errors = errors;
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            await new OkObjectResult(this).ExecuteResultAsync(context);
        }

    }
}
