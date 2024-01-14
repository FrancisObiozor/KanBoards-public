using Domain.Dtos;
using Domain.Features.Responses;
using MediatR;

namespace Domain.Features.Commands
{
    public class DeleteCommand : IRequest<ItemResponse<UserDto>>
    {
        public string Id { get; set; }

        public DeleteCommand(string id)
        {
            Id = id;
        }
    }
}
