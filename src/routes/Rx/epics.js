import action$, { dispatch } from './action$';
import { delay, filter, tap } from 'rxjs/operators';

console.log('once!');

const clickEpic$ = action$.pipe(
  filter(action => action.type === 'SET_TEXT'),
  delay(1000),
  tap(() => dispatch({ type: 'CLEAR_TEXT' }))
);
clickEpic$.subscribe();
