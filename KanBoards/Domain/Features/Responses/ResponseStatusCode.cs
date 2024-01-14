namespace Domain.Features.Responses
{
    public enum ResponseStatusCode : short
    {
        Undefined = 0,
        Ok = 200,
        Created = 201,
        Accepted = 202,
        NoContent = 204,
        NotModified = 304,
        BadRequest = 400,
        UnAuthorized = 401,
        Forbidden = 403,
        NotFound = 404,
        ImATeaPot = 418,
        ServerError = 500,
    }
}
