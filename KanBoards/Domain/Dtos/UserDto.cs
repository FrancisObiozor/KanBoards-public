namespace Domain.Dtos;

public class UserDto
{
    public string Id { get; set; }
    public string AuthId { get; set; } = string.Empty;
    public List<string> BoardIds { get; set; } = new List<string>();
    public Dictionary<string, BoardDto> BoardDtos { get; set; } = new Dictionary<string, BoardDto>();
    public Dictionary<string, ColumnDto> ColumnDtos { get; set; } = new Dictionary<string, ColumnDto>();
    public Dictionary<string, BoardItemDto> BoardItemDtos { get; set; } = new Dictionary<string, BoardItemDto>();
    public Dictionary<string, TaskDto> TaskDtos { get; set; } = new Dictionary<string, TaskDto>();

}

