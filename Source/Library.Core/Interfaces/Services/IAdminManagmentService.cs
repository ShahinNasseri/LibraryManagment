using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Commons;
using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Services
{
    public interface IAdminManagmentService
    {
        Task AddNewAdmin(AddNewAdminRequest request);
        Task RemoveAdmin(EntityIds request);
        Task DeactiveAdmin(EntityId request);
        Task<IEnumerable<User>> GetAdminList(GetAdminListRequest request);
    }
}
