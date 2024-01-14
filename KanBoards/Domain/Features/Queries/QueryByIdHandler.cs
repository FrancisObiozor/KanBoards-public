using Domain.Dtos;
using Domain.Features.Interfaces;
using Domain.Features.Responses;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Features.Queries;

public class QueryByIdHandler : IRequestHandler<QueryById, ItemResponse<UserDto>>
{
    private readonly IProvideUsers _provider;

    public QueryByIdHandler(IProvideUsers provider)
    {
        _provider = provider;
    }


    public async Task<ItemResponse<UserDto>> Handle(QueryById request, CancellationToken cancellationToken)
    {
        ItemResponse<UserDto> response;
        try
        {
            UserDto? userDto = _provider.GetUser(request.Id);
            response = ItemResponse<UserDto>.Success(userDto);
        }
        catch (Exception ex)
        {
            response = ItemResponse<UserDto>.Failure(new List<string> { ex.Message });
        }
        return await Task.FromResult(response);
    }
}