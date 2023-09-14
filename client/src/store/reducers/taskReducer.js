// taskReducer.js
import {
  TASKS_LIST_REQUEST,
  TASKS_LIST_SUCCESS,
  TASKS_LIST_FAIL,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
} from "../types/taskTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// const taskReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case TASKS_LIST_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case TASKS_LIST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload.tasks,
//         error: null,
//       };
//     case TASKS_LIST_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//         data: [],
//       };
//     case ADD_TASK_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case ADD_TASK_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: null,
//       };
//     case ADD_TASK_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//         data: [],
//       };
//     case UPDATE_TASK_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case UPDATE_TASK_SUCCESS:
//       // Update the task in the tasks array
//       const updatedTasks = state.tasks.map((task) =>
//         task.id === action.payload.id ? action.payload : task
//       );
//       return {
//         ...state,
//         loading: false,
//         data: updatedTasks,
//         error: null,
//       };
//     case UPDATE_TASK_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case DELETE_TASK_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case DELETE_TASK_SUCCESS:
//       // Filter out the deleted task by its ID
//       const updatedData = state.data.filter(
//         (task) => task.id !== action.payload
//       );
//       return {
//         ...state,
//         loading: false,
//         data: updatedData,
//         error: null,
//       };

//     case DELETE_TASK_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default taskReducer;

 const tasksListReducer = (state = initialState, action) => {
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
        data: [],
      };
    default:
      return state;
  }
};

 const addTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case ADD_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      };
    default:
      return state;
  }
};

 const deleteTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_TASK_SUCCESS:
      // Filter out the deleted task by its ID
      const updatedData = state.data.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        data: updatedData,
        error: null,
      };
    case DELETE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const updateTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_TASK_SUCCESS:
      // Update the task in the tasks array
      const updatedTasks = state.data.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      return {
        ...state,
        loading: false,
        data: updatedTasks,
        error: null,
      };
    case UPDATE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export {
  // taskReducer,
  tasksListReducer,
  addTaskReducer,
  updateTaskReducer,
  deleteTaskReducer,
};

