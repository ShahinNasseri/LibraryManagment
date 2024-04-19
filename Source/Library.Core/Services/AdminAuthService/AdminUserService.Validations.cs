using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Services
{
    public partial class AdminAuthService
    {
        public async Task<bool> IsEmailUniqueAsync(string email, CancellationToken token)
        {
            email = email.ToLower().Trim();
            var admin = await _uow.Admins.GetByEmailAsync(email);

            if (admin is null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> IsUsernameUniqueAsync(string username, CancellationToken token = default)
        {
            username = username.ToLower().Trim();
            var admin = await _uow.Admins.GetByUsernameAsync(username);

            if (admin is null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
