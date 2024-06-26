﻿using Library.Common.DTOs.AdminManagment.Requests;
using Library.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddAsync(User entity);
        void Delete(User entity);
        Task DeleteRangeAsync(string ids);
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(long id);
        Task<User?> GetByRefreshToken(string refreshToken);
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByEmailOrUsernameAsync(string emailOrUsername);
        void Update(User entity);
        Task<IEnumerable<User>> GetAdminUserListAsync(GetAdminListRequest request);
    }
}
