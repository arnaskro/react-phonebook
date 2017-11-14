import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import ContactsReducer from './ContactsReducer';

// Combine the reducers
const reducers = combineReducers({
  contacts: ContactsReducer
});

// Create middleware
// Thunk middleware allows to write action creators that return a function instead of an action
const middleware = applyMiddleware(thunk);

// Create the store object
const store = 
  (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 
  createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
  ) : createStore(reducers, middleware);

export default store;