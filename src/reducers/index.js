import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';
import auth from './auth';

const createReducer = asyncReducers => {
  const rootReducer = combineReducers({
    auth,
    ...asyncReducers
  });

  return connectRouter(history)(rootReducer);
};

// dynamic-redux-reducers
// https://tylergaw.com/articles/dynamic-redux-reducers/
export const injectReducer = (store) => {
  const asyncReducers = {};
  return (key, reducer) => {
    asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(asyncReducers));
    return store;
  };
};

export default createReducer;
