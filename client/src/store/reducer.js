export const initialState = {
  token: null,
};

export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
