using Domain.Dtos;

namespace Domain.Features.Interfaces
{
    public interface IDeleteUsers
    {
        UserDto? DeleteUser(string id);
    }
}
