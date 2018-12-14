import { startWith, scan, shareReplay } from 'rxjs/operators';
import myReducer, { initState } from './reducer';
import action$ from './action$';

// START EPICS
import './epics';

const reducers = [myReducer];

const combinedReducer = (state, action) =>
  reducers.reduce((state, reducer) => reducer(state, action), state);

const store$ = action$.pipe(
  startWith(initState),
  scan(combinedReducer),
  shareReplay(1)
);

export const injectReducer = reducer => reducers.push(reducer);

export const getState = () => {
  let state;
  store$.subscribe(_state => (state = _state)).unsubscribe();
  return state;
};

export default store$;
