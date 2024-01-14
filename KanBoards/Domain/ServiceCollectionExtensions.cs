using Domain.Dtos;
using Domain.Features.Responses;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Domain;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDomain(this IServiceCollection services)
    {

        services.AddMediatR(typeof(ServiceCollectionExtensions).Assembly);


        return services;
    }
}

