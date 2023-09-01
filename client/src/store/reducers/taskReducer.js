// taskReducer.js
import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TASKS_LIST_REQUEST,
  TASKS_LIST_SUCCESS,
  TASKS_LIST_FAIL,
} from "../types/taskTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case TASKS_LIST_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case TASKS_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload.tasks,
          error: null,
        };
      case TASKS_LIST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
          data: [], // You can change this based on your error handling strategy
        };
      default:
        return state;
    }
  };

export default taskReducer;
