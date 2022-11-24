using Microsoft.AspNetCore.Mvc;
using SimpleDataImport.Core.Cache;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SimpleDataImport.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatagridController : ControllerBase
    {
        private readonly IObjectCache<byte[]> _fileCache;

        public DatagridController(IObjectCache<byte[]> fileCache)
        {
            _fileCache = fileCache;
        }
        
        // GET: api/<DatagridController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<DatagridController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<DatagridController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DatagridController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DatagridController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
