using Domain;
namespace Domain.Features.Responses
{

    public class PagedResponse<T> : ListResponse<T>
    {
        public int PageSize { get; set; } = 25;

        public int CurrentPage { get; set; } = 1;

        public int TotalRecords { get; set; } = 0;

        public int TotalPages => (int)Math.Ceiling((decimal)TotalRecords / (decimal)PageSize);
        public static new PagedResponse<T> Success(List<T>? items) => new() { Items = items };
        public static new PagedResponse<T> Failure(List<string> errors) => new() { Errors = errors };
    }
}
