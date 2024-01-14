using Domain.Dtos;
using Domain.Features.Responses;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Features.Queries;

public class QueryById : IRequest<ItemResponse<UserDto>>
{
    public QueryById(string id)
    {
        Id = id;
    }

    public string Id { get; }
}
