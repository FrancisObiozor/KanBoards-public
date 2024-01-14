using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Datastore.MongoDbDataStore.Models
{
    public interface IUserStoreDatabaseSettings
    {
        public string UserStoreCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
