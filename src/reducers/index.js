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

export default createReducer;
