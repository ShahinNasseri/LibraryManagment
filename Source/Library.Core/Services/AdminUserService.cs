using Library.Core.Domain.Entities;
using Library.Core.Interfaces;
using Library.Core.Interfaces.Repositories;
using Library.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Services
{

    public class AdminUserService : IAdminUserService
    {
        private readonly IUnitOfWork _uow;

        public AdminUserService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task Login()
        {
            //return await _uow.Admins.AddAsync();
        }


    }
}
