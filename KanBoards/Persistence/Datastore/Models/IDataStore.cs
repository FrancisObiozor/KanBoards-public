using Domain.Features.Interfaces;
using MongoDB.Driver;
using Persistence.Datastore.MongoDbDataStore.Models;

namespace Persistence.Datastore.Models
{
    public interface IDataStore : IProvideUsers, ICreateUsers, IUpdateUsers, IDeleteUsers
    {
    }
}