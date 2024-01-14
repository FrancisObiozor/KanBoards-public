using Domain.Dtos;
using Domain.Features.Interfaces;
using Domain.Features.Responses;
using MediatR;

namespace Domain.Features.Commands;

public class UpdateCommandHandler : IRequestHandler<UpdateCommand, ItemResponse<UserDto>>
{
    private readonly IUpdateUsers _updater;

    public UpdateCommandHandler(IUpdateUsers updater)
    {
        _updater = updater;
    }


    public async Task<ItemResponse<UserDto>> Handle(UpdateCommand request, CancellationToken cancellationToken)
    {
        UserDto? updatedUser = _updater.UpdateUser(request.UserDto);

        ItemResponse<UserDto> response = new();

        try
        {
            if (updatedUser != null)
            {
                response = ItemResponse<UserDto>.Success(updatedUser);
            }
            else
            {
                response = ItemResponse<UserDto>.Failure(new List<string> { "There was a server error creating the ToDo List." });
            }
        }
        catch (Exception ex)
        {
            response = ItemResponse<UserDto>.Failure(new List<string>() { ex.Message });
        }

        return await Task.FromResult(response);

    }


}
