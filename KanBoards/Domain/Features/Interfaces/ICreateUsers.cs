using Domain.Dtos;

namespace Domain.Features.Interfaces
{
    public interface ICreateUsers
    {
        UserDto? AddUser(UserDto userDto);
    }
}
