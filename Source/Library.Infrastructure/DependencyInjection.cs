using Library.Common.Configuration;
using Library.Core.Interfaces;
using Library.Core.Interfaces.Services;
using Library.Infrastructure.Data;
using Library.Infrastructure.Data.Contexts;
using Library.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var appOptions = configuration.GetSection("AppOptions").Get<AppOptions>()!;
            services.AddDbContext<AppDbContext>(options =>
                            options.UseMySql(appOptions.MariaDBConnectionString, ServerVersion.AutoDetect(appOptions.MariaDBConnectionString)));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ITokenService, TokenService>();


            return services;
        }
    }
}
