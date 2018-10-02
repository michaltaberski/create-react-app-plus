import React from 'react';
import { object } from 'prop-types';

// https://tylergaw.com/articles/dynamic-redux-reducers/
const withReducer = (key, reducer, epic) => WrappedComponent => {
  const Extended = (props, context) => {
    context.store.injectReducer(key, reducer);
    if (epic) context.store.injectEpic(epic);

    return <WrappedComponent {...props} />;
  };

  Extended.contextTypes = {
    store: object
  };

  return Extended;
};

export { withReducer };
