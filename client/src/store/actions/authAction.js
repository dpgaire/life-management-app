import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from "../types/authTypes";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});


export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
