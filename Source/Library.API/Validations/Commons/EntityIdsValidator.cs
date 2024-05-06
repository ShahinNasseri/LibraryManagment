using FluentValidation;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Commons;
using Library.Core.Interfaces.Services;

namespace Library.API.Validations.Commons
{
    public class EntityIdsValidator: AbstractValidator<EntityIds>
    {
        public EntityIdsValidator()
        {
            RuleFor(x => x.Ids).NotNull().WithMessage("Ids is required").NotEmpty().WithMessage("Ids is required");
        }
    }
}
