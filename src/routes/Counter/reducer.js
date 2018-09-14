import { createAction } from 'redux-actions';
import buildImmerReducer from 'utils/buildImmerReducer';

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
  [INCREMENT_REQUESTED]: (state) => {
    state.isIncrementing = true;
  },
  [INCREMENT]: (state) => {
    state.count += 1;
    state.isIncrementing = false;
  },
  [DECREMENT_REQUESTED]: (state) => {
    state.isDecrementing = true;
  },
  [DECREMENT]: (state) => {
    state.count -= 1;
    state.isDecrementing = false;
  },
  [RESET]: () => initialState,
});

export const reset = createAction(RESET);
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const incrementRequested = createAction(INCREMENT_REQUESTED);
export const decrementRequested = createAction(DECREMENT_REQUESTED);

export const incrementAsync = () => {
  return dispatch => {
    dispatch(incrementRequested());
    return setTimeout(() => {
      dispatch(increment());
    }, 1000);
  };
};

export const decrementAsync = () => {
  return dispatch => {
    dispatch(decrementRequested());

    return setTimeout(() => {
      dispatch(decrement());
    }, 1000);
  };
};
