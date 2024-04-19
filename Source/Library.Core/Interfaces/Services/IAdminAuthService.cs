using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Services
{
    public interface IAdminAuthService
    {
        Task<AccessTokenModel> Login(LoginAdminRequest request);
        Task<bool> IsUsernameUniqueAsync(string username, CancellationToken token);
        Task<bool> IsEmailUniqueAsync(string email, CancellationToken token);
    }
}
