import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../actions/authAction";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    // Perform the API request to login
    const response = await fetch("http://localhost:3002/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (response.status === 200) {
      const { user, token } = data;
      dispatch(loginSuccess(user, token));
      localStorage.setItem('token', token);
    } else {
      dispatch(loginFailure(data?.error_message));
    }
    return data;
  } catch (error) {
    dispatch(loginFailure("An error occurred during login."));
  }
};
