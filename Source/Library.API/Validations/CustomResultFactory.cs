using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Results;
using Library.API.Models;

namespace Library.API.Validations
{
    public class CustomResultFactory : IFluentValidationAutoValidationResultFactory
    {
        public IActionResult CreateActionResult(ActionExecutingContext context, ValidationProblemDetails? validationProblemDetails)
        {
            var modelStateEntries = context.ModelState.Values;
            List<string> errors = new List<string>();
            foreach (var item in modelStateEntries)
            {
                foreach (var error in item.Errors)
                {
                    errors.Add(error.ErrorMessage);
                }
            }

            ApiResult resultObject = new ApiResult(null, StatusCodes.Status400BadRequest, errors.ToArray());
            return new BadRequestObjectResult(resultObject);

        }
    }
}
