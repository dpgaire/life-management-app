import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../types/authTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token, // Store token in Redux state
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
