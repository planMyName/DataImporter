using Microsoft.AspNetCore.Mvc;
using SimpleDataImport.Core.Abstraction;
using SimpleDataImport.Core.Cache;
using SimpleDataImport.Web.Models;

namespace SimpleDataImport.Web.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SchemaController : ControllerBase
    {
        private readonly ILogger<SchemaController> _logger;
        private readonly IObjectCache<Stream> _fileCache;
        private readonly IInputFileSchemaExtractor _inputFileSchemaExtractor;

        public SchemaController(ILogger<SchemaController> logger,
            IObjectCache<Stream> fileCache, IInputFileSchemaExtractor inputFileSchemaExtractor)
        {
            _logger = logger;
            _fileCache = fileCache;
            _inputFileSchemaExtractor = inputFileSchemaExtractor;
        }

        [HttpGet]
        public async Task<ImportSchemaModelDetail> GetImportSchemaModelAsync(string fileId)
        {
            var inputFileStream = await _fileCache.GetBinaryAsync(fileId);

            var schemaDetail = _inputFileSchemaExtractor.ExtractSchema(inputFileStream);

            return new ImportSchemaModelDetail();
        }
    }
}
