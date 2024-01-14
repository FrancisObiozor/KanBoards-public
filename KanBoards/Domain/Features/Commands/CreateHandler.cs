using Domain.Dtos;
using Domain.Features.Interfaces;
using Domain.Features.Responses;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Domain.Features.Commands
{
    public class CreateHandler : IRequestHandler<Create, ItemResponse<UserDto>>
    {
        private readonly ICreateUsers _creator;
        private readonly ILogger<CreateHandler> _logger;

        public CreateHandler(ICreateUsers creator, ILogger<CreateHandler> logger)
        {
            _creator = creator;
            _logger = logger;
        }

        public async Task<ItemResponse<UserDto>> Handle(Create request, CancellationToken cancellationToken)
        {
            UserDto? todoListDto = _creator.AddUser(request.UserDto);

            ItemResponse<UserDto> response;

            try
            {
                response = (todoListDto != null) switch
                {
                    true => ItemResponse<UserDto>.Success(todoListDto),
                    false => ItemResponse<UserDto>.Failure(new List<string> { "There was a server error creating the ToDo List." })
                };

            }
            catch (Exception ex)
            {
                // Log exception detail for debugging:
                _logger.LogError(ex, "An unexpected error occurred while creating a ToDo List.");

                // Return non-detail error
                response = ItemResponse<UserDto>.Failure(new List<string>() { "There was a server error creating the ToDo list." });
            }

            return await Task.FromResult(response);
        }


    }
}
