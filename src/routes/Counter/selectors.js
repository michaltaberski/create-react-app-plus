import { createSelector } from 'reselect';

export const counterSelector = (state) => state.counter;

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
