using Library.Common.DTOs.AdminManagment.Requests;
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

        Task RemoveAdmin(RemoveAdminRequest request);

    }
}
