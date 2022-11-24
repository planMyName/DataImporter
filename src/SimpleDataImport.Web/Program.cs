using AutoMapper;
using SimpleDataImport.Core.Abstraction.Schema;
using SimpleDataImport.Core.Cache;
using SimpleDataImport.Core.Schema;
using SimpleDataImport.Web.Mappings;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// program DI
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});
builder.Services.AddSingleton(mapperConfig.CreateMapper());
builder.Services.AddSingleton<IObjectCache<Stream>, InMemoryCache<Stream>>();
builder.Services.AddTransient<IInputFileSchemaExtractor, InputFileSchemaExtractor>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});


var app = builder.Build();

IronXL.License.LicenseKey = "IRONXL.PETERLAN.29846-80B5733054-OEDRUUUSAURV3WPZ-4FRANBKWSBVC-3UCWW3ORQNQU-J5BD6VB6L4FJ-WIM2PAGMZFYM-ONGPW4-TSPFKELYT7SIEA-DEPLOYMENT.TRIAL-GTALBH.TRIAL.EXPIRES.23.DEC.2022";


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
