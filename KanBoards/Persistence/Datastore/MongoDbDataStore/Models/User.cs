namespace Persistence.Datastore.MongoDbDataStore.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{

    public ObjectId _id { get; set; }
    [BsonElement("authId")]
    public string AuthId { get; set; } = string.Empty;
    [BsonElement("boardIds")]
    public List<string> BoardIds { get; set; } = new List<string>();
    [BsonElement("boards")]
    public Dictionary<string, Board> Boards { get; set; } = new Dictionary<string, Board>();
    [BsonElement("columns")]
    public Dictionary<string, Column> Columns { get; set; } = new Dictionary<string, Column>();
    [BsonElement("boardItems")]
    public Dictionary<string, BoardItem> BoardItems { get; set; } = new Dictionary<string, BoardItem>();
    [BsonElement("tasks")]
    public Dictionary<string, TaskItem> Tasks { get; set; } = new Dictionary<string, TaskItem>();

}
