using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Services
{
    public interface IAdminUserService
    {
        Task<AccessTokenModel> Register(RegisterAdminRequest request);

        Task<bool> IsUsernameUniqueAsync(string username, CancellationToken token);
        Task<bool> IsEmailUniqueAsync(string email, CancellationToken token);

    }
}
