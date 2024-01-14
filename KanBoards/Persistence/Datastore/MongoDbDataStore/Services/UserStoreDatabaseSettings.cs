using Microsoft.Extensions.Configuration;
using Persistence.Datastore.MongoDbDataStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Datastore.MongoDbDataStore.Services
{
    public class UserStoreDatabaseSettings : IUserStoreDatabaseSettings
    {
        public UserStoreDatabaseSettings(IConfiguration config)
        {
            string? currentEnvironment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            if (currentEnvironment == "Development")
            {
                UserStoreCollectionName = config["UserStoreDatabaseSettings:UserStoreCollectionName"];
                ConnectionString = config["UserStoreDatabaseSettings:ConnectionString"];
                DatabaseName = config["UserStoreDatabaseSettings:DatabaseName"];
            }
            else if (currentEnvironment == "Production")
            {
                //In the future, pull from server environment variables
                UserStoreCollectionName = config["UserStoreDatabaseSettings:UserStoreCollectionName"];
                ConnectionString = config["UserStoreDatabaseSettings:ConnectionString"];
                DatabaseName = config["UserStoreDatabaseSettings:DatabaseName"];
            }
        }
        public string UserStoreCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
