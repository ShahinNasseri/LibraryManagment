using FluentValidation;
using Library.Common.DTOs.AdminAuth.Requests;
using Library.Core.Interfaces.Services;

namespace Library.API.Validations.AdminAuth.Requests
{
    public class RegisterAdminRequestValidator : AbstractValidator<RegisterAdminRequest>
    {
        private IAdminUserService _adminUserService { get; set; }
        public RegisterAdminRequestValidator(IAdminUserService adminUserService)
        {
            _adminUserService = adminUserService;

            RuleFor(x => x.Email).NotEmpty().WithMessage("Email is required").EmailAddress().WithMessage("The Email is not valid");
            RuleFor(x => x.Password).MinimumLength(6).WithMessage("Password can not be less then 6 character");
            RuleFor(x => x.FullName).NotEmpty().WithMessage("Fullname is required");
            RuleFor(x => x.Username).NotEmpty().WithMessage("Username is required").MustAsync(BeUniqueUsername);
        }


        private async Task<bool> BeUniqueUsername(string username, CancellationToken token)
        {
            return true;
            //return await _userService.IsUsernameUniqueAsync(username, token);
        }
    }
}
