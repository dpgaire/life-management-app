import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/authReducer"; // Import your authReducer
import { addTaskReducer, updateTaskReducer, deleteTaskReducer, tasksListReducer } from "./reducers/taskReducer";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   task: tasksListReducer,
//   addTask: addTaskReducer,
//   updateTask: updateTaskReducer,
//   deleteTask: deleteTaskReducer
//   // Add more reducers here if needed
// });

// // Create the store with combined reducers and apply middleware
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunkMiddleware))
// );

// export default store;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { expensesApi } from '../app/services/expenseApi';

export const store = configureStore({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expensesApi.middleware),
});

setupListeners(store.dispatch);

export default store;

