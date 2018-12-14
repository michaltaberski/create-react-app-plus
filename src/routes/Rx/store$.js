import { startWith, scan, shareReplay } from 'rxjs/operators';
import reducer, { initState } from './reducer';
import action$ from './action$';

// START EPICS
import './epics';

const store$ = action$.pipe(
  startWith(initState),
  scan(reducer),
  shareReplay(1)
);

export const getState = () => {
  let state;
  store$.subscribe(_state => (state = _state)).unsubscribe();
  return state;
};

export default store$;
