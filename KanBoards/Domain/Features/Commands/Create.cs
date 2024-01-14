using Domain.Dtos;
using Domain.Features.Responses;
using MediatR;

namespace Domain.Features.Commands
{
    public class Create : IRequest<ItemResponse<UserDto>>
    {
        public UserDto UserDto { get; set; }

        public Create(UserDto userDto)
        {
            UserDto = userDto;
        }

    }
}
