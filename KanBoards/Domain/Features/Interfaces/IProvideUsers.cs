


using Domain.Dtos;

namespace Domain.Features.Interfaces
{
    public interface IProvideUsers
    {
        UserDto? GetUser(string id);

    }
}
