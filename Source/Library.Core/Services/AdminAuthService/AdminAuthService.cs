using Library.Common.DTOs.AdminAuth.Requests;
using Library.Common.Exceptions;
using Library.Common.Helpers;
using Library.Common.Models.Identity;
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

    public partial class AdminAuthService : IAdminAuthService
    {
        private readonly IUnitOfWork _uow;
        private readonly IAdminTokenService _adminTokenService;

        public AdminAuthService(IUnitOfWork uow, IAdminTokenService adminTokenService)
        {
            _uow = uow;
            _adminTokenService = adminTokenService;
        }

    }
}
