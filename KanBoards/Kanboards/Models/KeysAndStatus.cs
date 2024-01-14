namespace Api.Models
{
    public class KeysAndStatus
    {
        public string ApiKey { get; set; } = string.Empty;
        public string AuthDomain { get; set; } = string.Empty;
        public string ProjectId { get; set; } = string.Empty;
        public string StorageBucket { get; set; } = string.Empty;
        public string MessageSender { get; set; } = string.Empty;
        public string AppId { get; set; } = string.Empty;
        public string? ProductionStatus { get; set; } = string.Empty;

    }
}
