using Domain.Features.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Datastore.Models;
using Persistence.Datastore.MongoDbDataStore.Models;
using Persistence.Datastore.MongoDbDataStore.Services;

namespace Persistence;
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPersistance(this IServiceCollection services)
    {
        services.AddSingleton<IDataStore, DataStore>();
        services.AddSingleton<IUserStoreDatabaseSettings, UserStoreDatabaseSettings>();

        // ToDoLists
        services.AddTransient<IProvideUsers, DataStore>();
        services.AddTransient<ICreateUsers, DataStore>();
        services.AddTransient<IUpdateUsers, DataStore>();
        services.AddTransient<IDeleteUsers, DataStore>();


        return services;
    }
}
