using FluentValidation;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Auth.Requests;
using Library.Core.Interfaces.Services;

namespace Library.API.Validations.AdminAuth.Requests
{
    public class RegisterAdminRequestValidator : AbstractValidator<RegisterRequest>
    {
        private IAuthService _authService { get; set; }
        public RegisterAdminRequestValidator(IAuthService authService)
        {
            _authService = authService;
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email is required").EmailAddress().WithMessage("The Email is not valid").MustAsync(BeUniqueEmail).WithMessage("This email is already taken for another account");
            RuleFor(x => x.Password).MinimumLength(6).WithMessage("Password can not be less then 6 character");
            RuleFor(x => x.FullName).NotEmpty().WithMessage("Fullname is required");
            RuleFor(x => x.Username).NotEmpty().WithMessage("Username is required").MustAsync(BeUniqueUsername).WithMessage("This Username is already taken");
        }

        private async Task<bool> BeUniqueEmail(string email, CancellationToken token)
        {
            return await _authService.IsEmailUniqueAsync(email, token);
        }

        private async Task<bool> BeUniqueUsername(string username, CancellationToken token)
        {
            return await _authService.IsUsernameUniqueAsync(username, token);
        }
    }
}
