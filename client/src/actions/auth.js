import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

const filterEmptyValues = (data) => {
    return Object.keys(data).reduce((acc, key) => {
      if (data[key] !== "") {
        acc[key] = data[key];
      }
      return acc;
    }, {});
  };

export const signin = (formData, navigate) => async (dispatch) => {
    const filteredData = filterEmptyValues(formData);
  try {
    const { data } = await api.signIn(filteredData);

    dispatch({ type: AUTH, data });
    navigate('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    navigate('/auth');
  } catch (error) {
    console.log(error);
  }
};
