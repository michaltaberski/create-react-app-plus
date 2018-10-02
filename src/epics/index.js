import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

// https://redux-observable.js.org/docs/recipes/AddingNewEpicsAsynchronously.html
const epic$ = new BehaviorSubject(combineEpics());
const rootEpic = (action$, state$) => epic$.pipe(
  mergeMap(epic => epic(action$, state$))
);

export const injectEpic = () => (
  (epic) => epic$.next(epic)
);

export default rootEpic;
