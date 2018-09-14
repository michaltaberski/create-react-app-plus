import { createAction } from 'redux-actions';
import buildImmerReducer from 'utils/buildImmerReducer';
import noop from 'lodash/noop';
import sleep from 'utils/sleep';

export const REDUCER_NAME = 'counter';
export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED';
export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED';
export const DECREMENT = 'counter/DECREMENT';
export const RESET = 'counter/RESET';

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
};

export default buildImmerReducer(initialState, {
  [INCREMENT_REQUESTED]: state => {
    state.isIncrementing = true;
  },
  [INCREMENT]: state => {
    state.count += 1;
    state.isIncrementing = false;
  },
  [DECREMENT_REQUESTED]: state => {
    state.isDecrementing = true;
  },
  [DECREMENT]: state => {
    state.count -= 1;
    state.isDecrementing = false;
  },
  [RESET]: () => initialState
});

export const reset = createAction(RESET, noop);
export const increment = createAction(INCREMENT, noop);
export const decrement = createAction(DECREMENT, noop);
export const incrementRequested = createAction(INCREMENT_REQUESTED, noop);
export const decrementRequested = createAction(DECREMENT_REQUESTED, noop);

export const incrementAsync = () => {
  return async dispatch => {
    dispatch(incrementRequested());
    await sleep(500);
    dispatch(increment());
  };
};

export const decrementAsync = () => {
  return async dispatch => {
    dispatch(decrementRequested());
    await sleep(500);
    dispatch(decrement());
  };
};
