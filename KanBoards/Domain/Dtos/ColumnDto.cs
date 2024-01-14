namespace Domain.Dtos
{
    public class ColumnDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public List<string> BoardItemIds { get; set; }
    }
}