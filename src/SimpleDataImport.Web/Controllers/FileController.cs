using Microsoft.AspNetCore.Mvc;
using SimpleDataImport.Core.Cache;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SimpleDataImport.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IObjectCache<Stream> _fileCache;

        public FileController(IObjectCache<Stream> fileCache)
        {
            _fileCache = fileCache;
        }
        // GET: api/<FileController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<FileController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(string fileId)
        {
            if (string.IsNullOrEmpty(fileId))
            {
                return BadRequest();
            }

            var stream = await _fileCache.GetBinaryAsync(fileId);

            if (stream == null)
            {
                return NotFound();
            }

            return File(stream, "application/octet-stream");
        }

        // POST api/<FileController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromForm]string fileId, [FromForm] IFormFile file)
        {
            if (string.IsNullOrEmpty(fileId) || file == null || file.Length <= 0)
            {
                return BadRequest();
            }

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);

            await _fileCache.SetBinaryAsync(fileId, stream, TimeSpan.FromDays(1));

            return Ok();
        }

        // PUT api/<FileController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FileController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
