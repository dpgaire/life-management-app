import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/authReducer'; // Import your authReducer
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  // Add more reducers here if needed
});

// Create the store with combined reducers and apply middleware
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
