using Domain;
using Domain.Features.Responses;
namespace Domain.Features.Responses
{
    public class ListResponse<T> : Response
    {
        public List<T>? Items { get; set; }

        public bool IsSuccessful => Items != null;
        public static ListResponse<T> Success(List<T>? items) => new() { Items = items };
        public static ListResponse<T> Failure(List<string> errors) => new() { Errors = errors };

    }
}
