namespace Domain.Features.Responses
{
    public class ItemResponse<T> : Response
    {
        public T? Item { get; set; }

        public bool IsSuccessful => Item != null;
        public static ItemResponse<T> Success(T? item) => new() { Item = item, StatusCode = ResponseStatusCode.Ok };
        public static ItemResponse<T> Failure(List<string> errors) => new() { Errors = errors, StatusCode = ResponseStatusCode.BadRequest };
    }
}
