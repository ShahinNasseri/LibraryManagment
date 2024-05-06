using Library.Common.Configuration;
using Library.Core.Interfaces;
using Library.Core.Interfaces.Services;
using Library.Core.Services;
using Library.Core.Services.AdminManagmentService;
using Library.Core.Services.BookManagment;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Core
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCore(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IAdminManagmentService, AdminManagmentService>();
            services.AddScoped<IBookManagmentService, BookManagmentService>();

            return services;
        }
    }
}
