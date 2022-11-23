using Microsoft.AspNetCore.Mvc;
using SimpleDataImport.Web.Models;

namespace SimpleDataImport.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SchemaController : ControllerBase
    {
        private readonly ILogger<SchemaController> _logger;

        public SchemaController(ILogger<SchemaController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ImportSchemaModelDetail GetImportSchemaModel(string fileId)
        {
            return new ImportSchemaModelDetail();
        }
    }
}
