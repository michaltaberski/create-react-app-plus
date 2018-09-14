import produce from 'immer'

const buildImmerReducer = (initialState, actionsReducers = {}) => {
  return produce((state, action) => {
    const actionReducer = actionsReducers[action.type];
    if (actionReducer) return actionReducer(state, action);
  }, initialState);
};

export default buildImmerReducer;
