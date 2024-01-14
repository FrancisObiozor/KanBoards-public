using Domain.Dtos;
using Domain.Features.Responses;
using MediatR;

namespace Domain.Features.Commands;

public class UpdateCommand : IRequest<ItemResponse<UserDto>>
{
    public UserDto UserDto { get; set; }

    public UpdateCommand(UserDto userDto)
    {
        UserDto = userDto;
    }

}
