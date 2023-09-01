// taskActions.js
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TASKS_LIST_REQUEST,
  TASKS_LIST_SUCCESS,
  TASKS_LIST_FAIL,
} from "../types/taskTypes";

export const getTasks = (token) => async (dispatch, getState) => {
  dispatch({ type: TASKS_LIST_REQUEST});
  try {
    const response = await fetch("http://localhost:3002/api/tasks", {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("data on the response", data);
      const { tasks, message } = data;
      dispatch({
        type: TASKS_LIST_SUCCESS,
        payload: { tasks, message },
      });
    } else {
      dispatch({
        type: TASKS_LIST_FAIL,
        payload: "Error occurred while getting tasks",
      });
    }
  } catch (error) {
    dispatch({
      type: TASKS_LIST_FAIL,
      payload: "An error occurred during the request",
    });
  }
};

export const addTask = (taskData) => ({
  type: ADD_TASK,
  payload: taskData,
});

export const updateTask = (taskData) => ({
  type: UPDATE_TASK,
  payload: taskData,
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});
