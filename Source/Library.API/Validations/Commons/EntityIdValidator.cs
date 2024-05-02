using FluentValidation;
using Library.Common.DTOs.Commons;

namespace Library.API.Validations.Commons
{
    public class EntityIdValidator: AbstractValidator<EntityId>
    {
        public EntityIdValidator()
        {
            RuleFor(x => x.Id).NotNull().WithMessage("Id cannot be null");
        }
    }
}
