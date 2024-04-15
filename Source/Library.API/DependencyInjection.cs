using Microsoft.AspNetCore.Http.Features;
using System.Text.Json;
using FluentValidation;
using Microsoft.Extensions.Options;
using System.Reflection;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System.Text;
using Library.Common.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Library.API.ExceptionHandlers;

namespace Library.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddExceptionHandlers();
            services.AddEndpointsApiExplorer();
            services.AddApiOptions();
            services.AddValidatorAndSwaggerOptions();
            services.AddHttpContextAccessor();
            services.AddExtraServices(configuration);
            return services;
        }

        private static void AddExceptionHandlers(this IServiceCollection services)
        {
            services.AddExceptionHandler<CustomExceptionHandler>();
            services.AddExceptionHandler<NotFoundExceptionHandler>();
            services.AddExceptionHandler<InternalExceptionHandler>(); // this one should be the last Exception Handler becuse it does not have any if in it and catch any unhandled errors
        }

        private static void AddExtraServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<Microsoft.IO.RecyclableMemoryStreamManager>();
            services.AddJwtAuthentication(appjwtSettings: configuration.GetSection("UserPanelSettings").Get<Settings>()!.JwtSettings, adminPanelJwtSetting: configuration.GetSection("AdminPanelSettings").Get<Settings>()!.JwtSettings);
        }

        private static void AddApiOptions(this IServiceCollection services)
        {
            services.AddDirectoryBrowser();

            services.Configure<FormOptions>(option =>
            {
                option.ValueLengthLimit = int.MaxValue;
                option.MultipartBodyLengthLimit = int.MaxValue;
                option.MemoryBufferThreshold = int.MaxValue;
            });

            services.AddControllers(options =>
            {
            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });
        }

        private static void AddValidatorAndSwaggerOptions(this IServiceCollection services)
        {
            // Add FV validators
            services.AddValidatorsFromAssemblyContaining<Program>();
            // Add FV Rules to swagger
            services.AddFluentValidationRulesToSwagger();

            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                     {
                           new OpenApiSecurityScheme
                             {
                                 Reference = new OpenApiReference
                                 {
                                     Type = ReferenceType.SecurityScheme,
                                     Id = "Bearer"
                                 }
                             },
                             new string[] {}
                     }
                 });
            });
        }

        public static void AddJwtAuthentication(this IServiceCollection services, JwtSettings appjwtSettings, JwtSettings adminPanelJwtSetting)
        {
            services.AddAuthentication(options => {
                options.DefaultScheme = "Application_OR_AdminPanel";
                options.DefaultChallengeScheme = "Application_OR_AdminPanel";

            }).AddJwtBearer("Application", options =>
            {
                var secretKey = Encoding.UTF8.GetBytes(appjwtSettings.SecretKey);
                var encryptionKey = Encoding.UTF8.GetBytes(appjwtSettings.EncryptKey);

                var validationParameters = new TokenValidationParameters
                {
                    ClockSkew = TimeSpan.Zero, // default: 5 min
                    RequireSignedTokens = true,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(secretKey),

                    RequireExpirationTime = true,
                    ValidateLifetime = true,

                    ValidateAudience = true, //default : false
                    ValidAudience = appjwtSettings.Audience,

                    ValidateIssuer = true, //default : false
                    ValidIssuer = appjwtSettings.Issuer,

                    TokenDecryptionKey = new SymmetricSecurityKey(encryptionKey)
                };

                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = validationParameters;
            }).AddJwtBearer("AdminPanel", options =>
            {
                var secretKey = Encoding.UTF8.GetBytes(adminPanelJwtSetting.SecretKey);
                var encryptionKey = Encoding.UTF8.GetBytes(adminPanelJwtSetting.EncryptKey);

                var validationParameters = new TokenValidationParameters
                {
                    ClockSkew = TimeSpan.Zero, // default: 5 min
                    RequireSignedTokens = true,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(secretKey),

                    RequireExpirationTime = true,
                    ValidateLifetime = true,

                    ValidateAudience = true, //default : false
                    ValidAudience = adminPanelJwtSetting.Audience,

                    ValidateIssuer = true, //default : false
                    ValidIssuer = adminPanelJwtSetting.Issuer,

                    TokenDecryptionKey = new SymmetricSecurityKey(encryptionKey)
                };

                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = validationParameters;
            }).AddPolicyScheme("Application_OR_AdminPanel", "Application_OR_AdminPanel", options => {
                options.ForwardDefaultSelector = context =>
                {
                    string authorization = context.Request.Headers[HeaderNames.Authorization];
                    if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer "))
                    {
                        var token = authorization.Replace("Bearer ", string.Empty);
                        var isValidAdminPanelToken = IsValidatedToken(adminPanelJwtSetting, token);
                        var isValidApplicationToken = IsValidatedToken(appjwtSettings, token);
                        if (isValidAdminPanelToken)
                            return "AdminPanel";

                        if (isValidApplicationToken)
                            return "Application";
                    }
                    return "AdminPanel";
                };
            });


            // Authorization
            services.AddAuthorization(options =>
            {
                var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
                    JwtBearerDefaults.AuthenticationScheme,
                    "AdminPanel");
                defaultAuthorizationPolicyBuilder =
                    defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();
                options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
            });

        }

        private static bool IsValidatedToken(JwtSettings jwtSetting, string token)
        {
            try
            {
                var secretKey = Encoding.UTF8.GetBytes(jwtSetting.SecretKey); // longer that 16 character
                var encryptionkey = Encoding.UTF8.GetBytes(jwtSetting.EncryptKey); //must be 16 character

                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true, //you might want to validate the audience and issuer depending on your use case
                    ValidAudience = jwtSetting.Audience,
                    ValidateIssuer = true,
                    ValidIssuer = jwtSetting.Issuer,
                    RequireSignedTokens = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(secretKey),
                    TokenDecryptionKey = new SymmetricSecurityKey(encryptionkey),
                    ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                SecurityToken securityToken;
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
                if (principal == null)
                    return false;
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }

    }
}
