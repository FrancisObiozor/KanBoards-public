using Domain.Dtos;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using Persistence.Datastore.Models;
using Persistence.Datastore.MongoDbDataStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Datastore.MongoDbDataStore.Services
{
    public class DataStore : IDataStore
    {
        private IMongoCollection<User> UserCollection { get; set; }
        public DataStore(IUserStoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            UserCollection = database.GetCollection<User>(settings.UserStoreCollectionName);
        }


        //ADD
        public UserDto? AddUser(UserDto userDto)
        {
            var user = convertUserDtoToUser(userDto);
            UserCollection.InsertOne(user);
            var newUserDto = convertUserToUserDto(user);
            return newUserDto;
        }


        //GET
        public UserDto? GetUser(string id)
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq("authId", id);
            var user = UserCollection.Find(filter).FirstOrDefault();

            var userDto = convertUserToUserDto(user);
            return userDto;
        }

        //UPDATE
        public UserDto? UpdateUser(UserDto userDto)
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq("authId", userDto.AuthId);
            var newUser = convertUserDtoToUser(userDto);

            UserCollection.ReplaceOne(filter, newUser);
            return userDto;
        }


        //DELETE
        public UserDto? DeleteUser(string id)
        {
            FilterDefinition<User> filter = Builders<User>.Filter.Eq("authId", id);
            var existingUser = UserCollection.Find(filter).First();
            var userDto = convertUserToUserDto(existingUser);
            UserCollection.DeleteOne(filter);
            return userDto;
        }

        public User convertUserDtoToUser(UserDto userDto)
        {
            var user = new User();
            user.AuthId = userDto.AuthId;
            user.BoardIds = userDto.BoardIds;
            mapBoardDtosToBoards(userDto, user);
            mapColumnDtosToColumns(userDto, user);
            mapBoardItemDtosToBoardItems(userDto, user);
            mapTaskDtosToTasks(userDto, user);

            return user;
        }

        private static void mapTaskDtosToTasks(UserDto userDto, User user)
        {
            if (userDto.TaskDtos != null)
            {
                user.Tasks = new Dictionary<string, TaskItem>();
                foreach (var kvp in userDto.TaskDtos)
                {
                    var task = new TaskItem
                    {
                        Id = kvp.Value.Id,

                    };
                    user.Tasks.Add(kvp.Key, task);
                }
            }
            else
            {
                user.Tasks = new Dictionary<string, TaskItem>();
            }
        }

        private static void mapBoardItemDtosToBoardItems(UserDto userDto, User user)
        {
            if (userDto.BoardItemDtos != null)
            {
                user.BoardItems = new Dictionary<string, BoardItem>();
                foreach (var kvp in userDto.BoardItemDtos)
                {
                    var boardItem = new BoardItem
                    {
                        Id = kvp.Value.Id,
                        Title = kvp.Value.Title,
                        Description = kvp.Value.Description,
                        DueDate = kvp.Value.DueDate,
                        IsDone = kvp.Value.IsDone,
                        TaskIds = kvp.Value.TaskIds,
                    };
                    user.BoardItems.Add(kvp.Key, boardItem);
                }
            }
            else
            {
                user.BoardItems = new Dictionary<string, BoardItem>();
            }
        }

        private static void mapColumnDtosToColumns(UserDto userDto, User user)
        {
            if (userDto.ColumnDtos != null)
            {
                user.Columns = new Dictionary<string, Column>();
                foreach (var kvp in userDto.ColumnDtos)
                {
                    var column = new Column
                    {
                        Id = kvp.Value.Id,
                        Title = kvp.Value.Title,
                        BoardItemIds = kvp.Value.BoardItemIds,
                    };
                    user.Columns.Add(kvp.Key, column);
                }
            }
            else
            {
                user.Columns = new Dictionary<string, Column>();
            }
        }
        private static void mapBoardDtosToBoards(UserDto userDto, User user)
        {
            if (userDto.BoardDtos != null)
            {
                user.Boards = new Dictionary<string, Board>();
                foreach (var kvp in userDto.BoardDtos)
                {
                    var board = new Board
                    {
                        Id = kvp.Value.Id,
                        Title = kvp.Value.Title,
                        ColumnIds = kvp.Value.ColumnIds,
                    };
                    user.Boards.Add(kvp.Key, board);
                }
            }
            else
            {
                user.Boards = new Dictionary<string, Board>();
            }
        }

        public UserDto convertUserToUserDto(User user)
        {
            var userDto = new UserDto();
            userDto.Id = user._id.ToString();
            userDto.AuthId = user.AuthId;
            userDto.BoardIds = user.BoardIds;
            mapBoardsToBoardDtos(user, userDto);
            mapColumnsToColumnDtos(user, userDto);
            mapBoardItemsToBoardItemDtos(user, userDto);
            mapTasksToTaskDtos(user, userDto);

            return userDto;
        }

        private static void mapBoardsToBoardDtos(User user, UserDto userDto)
        {
            if (user.Boards != null)
            {
                userDto.BoardDtos = new Dictionary<string, BoardDto>();
                foreach (var kvp in user.Boards)
                {
                    var boardDto = new BoardDto
                    {
                        Id = kvp.Value.Id,
                        Title = kvp.Value.Title,
                        ColumnIds = kvp.Value.ColumnIds,
                    };
                    userDto.BoardDtos.Add(kvp.Key, boardDto);

                }
            }
            else
            {
                userDto.BoardDtos = new Dictionary<string, BoardDto>();
            }
        }
        private static void mapColumnsToColumnDtos(User user, UserDto userDto)
        {
            if (user.Columns != null)
            {
                userDto.ColumnDtos = new Dictionary<string, ColumnDto>();
                foreach (var kvp in user.Columns)
                {
                    var columnDto = new ColumnDto
                    {
                        Id = kvp.Value.Id,
                        Title = kvp.Value.Title,
                        BoardItemIds = kvp.Value.BoardItemIds,

                    };
                    userDto.ColumnDtos.Add(kvp.Key, columnDto);
                }
            }
            else
            {
                userDto.ColumnDtos = new Dictionary<string, ColumnDto>();
            }
        }
        private static void mapBoardItemsToBoardItemDtos(User user, UserDto userDto)
        {
            if (user.BoardItems != null)
            {
                userDto.BoardItemDtos = new Dictionary<string, BoardItemDto>();
                foreach (var kvp in user.BoardItems)
                {
                    var boardItemDto = new BoardItemDto
                    {
                        Id = kvp.Value.Id,
                        Title = kvp.Value.Title,
                        Description = kvp.Value.Description,
                        DueDate = kvp.Value.DueDate,
                        IsDone = kvp.Value.IsDone,
                        TaskIds = kvp.Value.TaskIds,
                    };
                    userDto.BoardItemDtos.Add(kvp.Key, boardItemDto);
                }
            }
            else
            {
                userDto.BoardItemDtos = new Dictionary<string, BoardItemDto>();
            }
        }
        private static void mapTasksToTaskDtos(User user, UserDto userDto)
        {
            if (user.Tasks != null)
            {
                userDto.TaskDtos = new Dictionary<string, TaskDto>();
                foreach (var kvp in user.Tasks)
                {
                    var taskDto = new TaskDto
                    {
                        Id = kvp.Value.Id,
                        Title = kvp.Value.Title,
                        IsCompleted = kvp.Value.IsCompleted,
                    };
                    userDto.TaskDtos.Add(kvp.Key, taskDto);
                }
            }
            else
            {
                userDto.TaskDtos = new Dictionary<string, TaskDto>();
            }
        }

    }
}
