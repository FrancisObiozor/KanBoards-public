using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Datastore.MongoDbDataStore.Models
{
    public class TaskItem
    {
        [BsonElement("id")]
        public string Id { get; set; } = string.Empty;
        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;
        [BsonElement("isCompleted")]
        public bool IsCompleted { get; set; }
    }
}
