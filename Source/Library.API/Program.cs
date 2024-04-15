using Library.API;
using Library.API.Middlewares;
using Library.Infrastructure;
using Library.Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Library.Core;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigurationManager configuration = builder.Configuration;
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddApiServices(configuration);
builder.Services.AddInfrastructure(configuration);
builder.Services.AddCore(configuration);





var app = builder.Build();
app.UseExceptionHandler(o => { }); // Should be always in first place to catch all errors

// Ensure the database is created
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    //dbContext.Database.EnsureCreated(); // This will create the database if it does not exist
    dbContext.Database.Migrate(); // Use this instead if you're using migrations
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});


app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404 &&
              !Path.HasExtension(context.Request.Path.Value) &&
              !context.Request.Path.Value.StartsWith("/api/", StringComparison.OrdinalIgnoreCase))
    {
        context.Request.Path = "/index.html";
        await next();
    }
});

app.UseStaticFiles();

//app.UseStaticFiles(new StaticFileOptions()
//{
//    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
//    RequestPath = new PathString("/Resources"),
//    ServeUnknownFileTypes = true,
//});

app.UseRouting();
//app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
