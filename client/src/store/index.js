import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const DEFAULT_STATE = {
  auth: { isAuthenticated: false },
  error: { message: null },
  polls: [],
  currentPoll: {
    _id: '5b086e20f7d2381502ce0e46',
    options: [],
    question: 'test_poll',
  },
};

// Use configureStore instead of createStore
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: DEFAULT_STATE,
  middleware: [thunk],
  // Add any additional configuration options if needed
});
