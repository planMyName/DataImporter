using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SimpleDataImport.Core.Abstraction.Schema;
using SimpleDataImport.Core.Cache;
using SimpleDataImport.Web.Models;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using SchemaHeader = SimpleDataImport.Core.Abstraction.Schema.SchemaHeader;


namespace SimpleDataImport.Web.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SchemaController : ControllerBase
    {
        private readonly ILogger<SchemaController> _logger;
        private readonly IObjectCache<Stream> _fileCache;
        private readonly IInputFileSchemaExtractor _inputFileSchemaExtractor;
        private readonly IHostingEnvironment _environment;
        private readonly IMapper _mapper;

        public SchemaController(ILogger<SchemaController> logger,
            IObjectCache<Stream> fileCache,
            IInputFileSchemaExtractor inputFileSchemaExtractor,
            IHostingEnvironment environment,
            IMapper mapper)
        {
            _logger = logger;
            _fileCache = fileCache;
            _inputFileSchemaExtractor = inputFileSchemaExtractor;
            _environment = environment;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("importschemamodel")]
        public async Task<ImportSchemaModelDetail> GetImportSchemaModelAsync(string fileId, string migrationType)
        {
            var inputFileStream = await _fileCache.GetBinaryAsync(fileId);

            var inputSchemaHeaders = _inputFileSchemaExtractor.ExtractSchema(inputFileStream);

            var targetSchemaHeaders = GetMigrationTemplateHeaders(migrationType, "AU");

            return new ImportSchemaModelDetail()
            {
                InputHeaders = inputSchemaHeaders.Select(_mapper.Map<Models.SchemaHeader>).ToList(),
                SchemaHeaders = targetSchemaHeaders.Select(_mapper.Map<Models.SchemaHeader>).ToList()
            };
        }


        private ICollection<SchemaHeader> GetMigrationTemplateHeaders(string migrationType, string region)
        {
            // ToDo: move to SmokeballSchemaRetriever
            var fileName = migrationType switch
            {
                "staffs" => "SB-StaffImport.csv",
                "contacts" => "SB-ContactImport.csv",
                "matters" => "SB-MatterImport.csv",
                _ => throw new ArgumentOutOfRangeException(nameof(migrationType), migrationType, null)
            };

            var filePath = Path.Combine(_environment.ContentRootPath, $"MigrationTemplates/{region}/{fileName}");

            using var fileStream = System.IO.File.Open(filePath, FileMode.Open);
            var schemaHeaders = _inputFileSchemaExtractor.ExtractSchema(fileStream);
            return schemaHeaders;
        }
    }
}
