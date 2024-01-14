namespace Persistence.Datastore.MongoDbDataStore.Models;
using MongoDB.Bson.Serialization.Attributes;

public class Board
{
    [BsonElement("id")]
    public string Id { get; set; } = string.Empty;
    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;
    [BsonElement("columnIds")]
    public List<string> ColumnIds { get; set; } = new List<string>();

}