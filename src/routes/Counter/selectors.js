import { createSelector } from 'reselect';
import { REDUCER_NAME } from './reducer';

export const counterSelector = (state) => state[REDUCER_NAME];

export const counterValueSelector = createSelector(
  counterSelector,
  (counter) => counter.count
);

export const counterIsIncrementingSelector = createSelector(
  counterSelector,
  (counter) => counter.isIncrementing
);

export const counterIsDecrementingSelector = createSelector(
  counterSelector,
  (counter) => counter.isDecrementing
);
