using Domain.Dtos;
using Domain.Features.Responses;
using Domain.Features.Commands;
using Domain.Features.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence.Datastore.Models;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

#pragma warning disable S1135 // Track uses of "TODO" tags
// TODO: Work this into features for ASP.Net Core to match pattern w/ Domain & Persistence projects -- Micah.

namespace Api
#pragma warning restore S1135 // Track uses of "TODO" tags
{
    [EnableCors()]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IDataStore _dataStore;

        public UsersController(IMediator mediator, IDataStore dataStore)
        {
            _mediator = mediator;
            _dataStore = dataStore;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Welcome to Kanboards");
        }


        // GET api/<UsersController>/abc
        [HttpGet("{id:regex(^[[a-zA-Z0-9-_]]+$)}")]
        public async Task<IActionResult> Get(string id)
        {
            if (ModelState.IsValid)
            {
                var response = await _mediator.Send(new QueryById(id));
                return Ok(response);
            }
            else
            {
                return BadRequest("Provided model is invalid.");
            }
        }


        // POST api/<UsersController>
        [HttpPost]
        [ProducesResponseType(typeof(ItemResponse<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ItemResponse<UserDto>), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] UserDto userDto)
        {

            var response = await _mediator.Send(new Create(userDto));
            return response.StatusCode switch
            {
                ResponseStatusCode.Ok => Ok(response),
                ResponseStatusCode.BadRequest => BadRequest(response),
                _ => StatusCode(StatusCodes.Status500InternalServerError),
            };
        }

        // PUT api/<UsersController>
        [HttpPut]
        [ProducesResponseType(typeof(ItemResponse<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ItemResponse<UserDto>), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put([FromBody] UserDto userDto)
        {
            var test = userDto;
            var response = await _mediator.Send(new UpdateCommand(userDto));
            return response.StatusCode switch
            {
                ResponseStatusCode.Ok => Ok(response),
                ResponseStatusCode.BadRequest => BadRequest(response),
                _ => StatusCode(StatusCodes.Status500InternalServerError),
            };
        }



        // DELETE api/<UsersController>/abc
        [HttpDelete("{id:regex(^[[a-zA-Z0-9-_]]+$)}")]
        [ProducesResponseType(typeof(ItemResponse<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ItemResponse<UserDto>), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(string id)
        {
            var response = await _mediator.Send(new DeleteCommand(id));
            return response.StatusCode switch
            {
                ResponseStatusCode.Ok => Ok(response),
                ResponseStatusCode.BadRequest => BadRequest(response),
                _ => StatusCode(StatusCodes.Status500InternalServerError),
            };
        }
    }
}
