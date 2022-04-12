const initialState = {
  users: [],
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USERS":
      return {
        ...state,
        users: payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === payload.id) {
            return payload;
          }
          return user;
        }),
      };

    case "DELETE_USERS":
      return {
        ...state,
        users: state.users.filter((element) => {
          return element.id != payload;
        }),
      };

    default:
      return state;
  }
};

export default usersReducer;

// Actions:

export const setUser = (users) => {
  return { type: "SET_USERS", payload: users };
};

export const updateHotelById = (user) => {
  return { type: "UPDATE_USER", payload: user };
};

export const deleteUserById = (id) => {
  return { type: "DELETE_USER", payload: id };
};
