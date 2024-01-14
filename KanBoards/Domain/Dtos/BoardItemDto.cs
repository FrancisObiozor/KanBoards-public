namespace Domain.Dtos
{
    public class BoardItemDto
    {
        public string Id { get; set; }
        public bool IsDone { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public List<string> TaskIds { get; set; }
    }
}