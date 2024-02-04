export const initialState = null;
export const reducer = (state, action) => {
  // if we are login, state value becomes true from login.jsx
  // if we are logout, state value becomes false from logout.jsx
  if (action.type === "USER") {
    return action.payload;
  }

  return state;
};
