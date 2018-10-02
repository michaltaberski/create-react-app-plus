import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';

import thunk from 'redux-thunk';
import createReducer, { injectReducer } from './reducers';
import rootEpic, { injectEpic } from './epics';
import history from './history';

const initialState = {};
const enhancers = [];

const epicMiddleware = createEpicMiddleware();
const middleware = [epicMiddleware, thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(createReducer(), initialState, composedEnhancers);
// it has to run after the store is created
epicMiddleware.run(rootEpic);

store.injectEpic = injectEpic(store);
store.injectReducer = injectReducer(store);

export default store;
