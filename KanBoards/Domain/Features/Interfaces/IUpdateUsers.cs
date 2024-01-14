using Domain.Dtos;

namespace Domain.Features.Interfaces
{
    public interface IUpdateUsers
    {
        UserDto? UpdateUser(UserDto userDto);
    }
}
