namespace Domain.Features.Responses
{
    public class Response
    {
        public List<string>? Errors { get; set; }

        public ResponseStatusCode StatusCode { get; set; }

        public Dictionary<string, object?> AdditionalData { get; set; } = new Dictionary<string, object?>();
    }
}
