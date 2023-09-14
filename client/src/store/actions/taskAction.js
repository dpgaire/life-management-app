import {
  TASKS_LIST_REQUEST,
  TASKS_LIST_SUCCESS,
  TASKS_LIST_FAIL,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  ADD_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
} from "../types/taskTypes";

export const getTasks = (token) => async (dispatch, getState) => {
  dispatch({ type: TASKS_LIST_REQUEST });
  try {
    const response = await fetch("http://localhost:3002/api/tasks", {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      const { tasks, message } = data;
      dispatch({
        type: TASKS_LIST_SUCCESS,
        payload: { tasks, message },
      });
    } else {
      dispatch({
        type: TASKS_LIST_FAIL,
        payload: "You are not allowed to access, login first!",
      });
    }
  } catch (error) {
    dispatch({
      type: TASKS_LIST_FAIL,
      payload: "An error occurred during the request",
    });
  }
};

export const addTask = (token, newTask) => async (dispatch, getState) => {
  dispatch({ type: ADD_TASK_REQUEST });
  try {
    const response = await fetch("http://localhost:3002/api/tasks", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (response.status === 201) {
      const data = await response.json();
      dispatch({
        type: ADD_TASK_SUCCESS,
        payload: data, // You can adjust the payload as needed
      });
    } else {
      dispatch({
        type: ADD_TASK_FAIL,
        payload: "Error adding task. Please try again.",
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_TASK_FAIL,
      payload: "An error occurred during the request",
    });
  }
};

export const updateTask = (taskId, updatedTask, token) => async (dispatch) => {
  dispatch({ type: UPDATE_TASK_REQUEST });

  try {
    const response = await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.status === 200) {
      const updatedTaskData = await response.json();
      console.log("first task updated", updatedTaskData);
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: updatedTaskData,
      });
    } else {
      dispatch({
        type: UPDATE_TASK_FAIL,
        payload: "Error updating task. Please try again.",
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload: "An error occurred during the request.",
    });
  }
};

export const deleteTask = (taskId, token) => async (dispatch, getState) => {
  dispatch({ type: DELETE_TASK_REQUEST });
  try {
    const response = await fetch(`http://localhost:3002/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    if (response.status === 204) {
      dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
      dispatch({
        type: ADD_TASK_SUCCESS,// You can adjust the payload as needed
      });
    } else {
      const errorMessage = "Error deleting task";
      dispatch({ type: DELETE_TASK_FAIL, payload: errorMessage });
    }
  } catch (error) {
    const errorMessage = "An error occurred during the request";
    dispatch({ type: DELETE_TASK_FAIL, payload: errorMessage });
  }
};
