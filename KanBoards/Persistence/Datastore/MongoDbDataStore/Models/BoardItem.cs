using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Persistence.Datastore.MongoDbDataStore.Models
{
    public class BoardItem
    {
        [BsonElement("id")]
        public string Id { get; set; } = string.Empty;
        [BsonElement("isDone")]
        public bool IsDone { get; set; }
        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;
        [BsonElement("description")]
        public string Description { get; set; } = string.Empty;
        [BsonElement("dueDate")]
        public DateTime DueDate { get; set; }
        [BsonElement("taskIds")]
        public List<string> TaskIds { get; set; } = new List<string>();
    }
}
