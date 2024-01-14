import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { populateUserData } from "../Login/populateUserData";
import { useAuth } from "../../Firebase/AuthContext";

//Test backend get endpoint
export const testGetEndpoint = () => {
  const testUrl = "http://localhost:5000";
  const userId = "OF5EIycYaEZo3fBAbjdiV5Q10vs2";
  axios
    .get(`${testUrl}/api/Users/${userId}`)
    .then((response) => {
      console.log("Backend communication test passed")
      console.log(response);
    })
    .catch((error) => {
      console.log("Backend communication test failed")
      console.log(error);
    });
};

const backendUrl = "http://localhost:5000";

//GET ApiKeys and Backend status
export const getApiKeysAndBackendStatus = () => {
  return axios.get(`${backendUrl}/api/KeysAndStatus`);
};

//GET User
export const getUserFromDb = (userId, navigate) => {
  axios
    .get(`${backendUrl}/api/Users/${userId}`)
    .then((response) => {
      console.log(response);
      const userDto = response.data.item;
      var user = convertDtoToUser(userDto);
      populateUserData(user);
      navigate("/home");
    })
    .catch((error) => {
      console.log(error);
    });
};

//ADD
export const addUserToDb = (userId, navigate, deleteCurrentUser, setError) => {
  const userDto = createNewUserDto(userId);
  console.log(userDto)
  axios
    .post(`${backendUrl}/api/Users`, userDto)
    .then(function (response) {
      console.log(response);
      var newUserDto = response.data.item;
      const newUser = convertDtoToUser(newUserDto);
      populateUserData(newUser);
      navigate("/home");
    })
    .catch(function (error) {
      setError("Account could not be created. Try Again.");
      console.log("User could not be added to database.");
      console.log(error);
      //If user wasn't added to database then the firebase account gets deleted
      deleteCurrentUser()
        .then(() => {
          console.log("Account was successfully deleted from firebase!");
        })
        .catch((error) => {
          setError("There was an error when deleting your account.");
          console.log("Account was not deleted from firebase.");
          console.log(error);
        });
    });
};

//UPDATE
export const updateUserInDb = (user) => {
  const userDto = convertUserToDto(user);
  axios
    .put(`${backendUrl}/api/Users`, userDto)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

//DELETE
export const deleteUserFromDb = (userId, navigate) => {
  return axios
    .delete(`${backendUrl}/api/Users/${userId}`)
    .then((response) => {
      navigate("/");
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNewUserDto = (userId) => {
  const newBoardId = uuidv4();
  console.log(userId)
  const newUser = {
    id: userId,
    authId: userId,
    boardIds: [newBoardId],
    boardDtos: {},
    boardItemDtos: {},
    columnDtos: {},
    taskDtos: {}
  };
  newUser.boardDtos[newBoardId] = {
    id: newBoardId,
    title: "New Board",
    columnIds: []
  };

  return newUser;
};

export const convertUserToDto = (user) => {
  const userDto = {
    id: user.id,
    authId: user.authId,
    boardDtos: user.boards,
    boardIds: user.boardIds,
    boardItemDtos: user.boardItems,
    columnDtos: user.columns,
    taskDtos: user.tasks,
  };
  return userDto;
};

export const convertDtoToUser = (userDto) => {
  const user = {
    id: userDto.id,
    authId: userDto.authId,
    boards: userDto.boardDtos,
    boardIds: userDto.boardIds,
    boardItems: userDto.boardItemDtos,
    columns: userDto.columnDtos,
    tasks: userDto.taskDtos,
  };
  return user;
};
