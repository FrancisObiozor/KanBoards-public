using Domain.Dtos;
using Domain.Features.Interfaces;
using Domain.Features.Responses;
using MediatR;

namespace Domain.Features.Commands
{
    public class DeleteCommandHandler : IRequestHandler<DeleteCommand, ItemResponse<UserDto>>
    {
        private readonly IDeleteUsers _delete;

        public DeleteCommandHandler(IDeleteUsers delete)
        {
            _delete = delete;
        }
        public async Task<ItemResponse<UserDto>> Handle(DeleteCommand request, CancellationToken cancellationToken)
        {
            UserDto? deletedToDoList = _delete.DeleteUser(request.Id);

            ItemResponse<UserDto> response = new();

            try
            {
                if (deletedToDoList != null)
                {
                    response = ItemResponse<UserDto>.Success(deletedToDoList);
                }
                else
                {
                    response = ItemResponse<UserDto>.Failure(new List<string> { "Unable to remove the ToDo List." });
                }
            }
            catch (Exception ex)
            {
                response = ItemResponse<UserDto>.Failure(new List<string>() { ex.Message });
            }

            return await Task.FromResult(response);
        }
    }
}
