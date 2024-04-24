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

    public partial class AuthService : IAuthService
    {
        private readonly IUnitOfWork _uow;
        private readonly ITokenService _adminTokenService;

        public AuthService(IUnitOfWork uow, ITokenService adminTokenService)
        {
            _uow = uow;
            _adminTokenService = adminTokenService;
        }

    }
}
