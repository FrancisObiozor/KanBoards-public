using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
namespace Persistence.Datastore.MongoDbDataStore.Models
{
    public class Column
    {
        [BsonElement("id")]
        public string Id { get; set; } = string.Empty;
        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;
        [BsonElement("columnIds")]
        public List<string> BoardItemIds { get; set; } = new List<string>();
    }
}
