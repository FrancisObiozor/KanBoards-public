using Domain.Dtos;
using MongoDB.Bson;
using Persistence.Datastore.Models;
using Persistence.Datastore.MongoDbDataStore.Models;

namespace Persistence.Datastore.MockDataStore
{
    public class MockDataStore : IDataStore
    {



        public MockDataStore()
        {
            GenerateUsers();
        }

        public UserDto? AddUser(UserDto toDoListDto)
        {
            throw new NotImplementedException();
        }

        public UserDto? DeleteUser(string id)
        {
            throw new NotImplementedException();
        }

        public UserDto? GetUser(string id)
        {
            throw new NotImplementedException();
        }

        public UserDto? UpdateUser(UserDto userDto)
        {
            throw new NotImplementedException();
        }

        private void GenerateUsers()
        {
            var users = new List<User>();
            users.AddRange(new List<User>()
            {
                new User
                {
                    _id = ObjectId.Parse("ZL3PpEb7mxccUrmFAejA699nyDA3"),
                    BoardIds = new List<string> { "2b27cdef-d2d7-43d5-a037-84c730c5f315", "ae87b96a-7c4f-4d82-b1ff-da4cccdd1b00" }
                },
                new User
                {
                   _id = ObjectId.Parse("gTBCpAWOn2UNAgHEDSHUkiPsX5A2"),
                    BoardIds = new List<string> { "d8a16bcf-d522-48ab-92f1-199b7e040686" }
                },
            });
        }

    }
}
