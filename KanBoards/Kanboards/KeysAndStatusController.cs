using Api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api
{
    [EnableCors()]
    [Route("api/[controller]")]
    [ApiController]
    public class KeysAndStatusController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public KeysAndStatusController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public IActionResult Get()
        {
            string? currentEnvironment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            KeysAndStatus keysAndStatus = new KeysAndStatus
            {
                ApiKey = _configuration["ReactApp:ApiKey"],
                AuthDomain = _configuration["ReactApp:AuthDomain"],
                ProjectId = _configuration["ReactApp:ProjecId"],
                StorageBucket = _configuration["ReactApp:StorageBucket"],
                MessageSender = _configuration["ReactApp:MessageSenderId"],
                AppId = _configuration["ReactApp:AppId"],
                ProductionStatus = currentEnvironment
            };
            return Ok(keysAndStatus);
        }
    }
}

