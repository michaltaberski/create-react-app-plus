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

export const reset = () => ({
  type: RESET,
});

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    });

    dispatch({
      type: INCREMENT
    });
  };
};

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      });
    }, 1000);
  };
};

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    });

    dispatch({
      type: DECREMENT
    });
  };
};

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      });
    }, 1000);
  };
};
