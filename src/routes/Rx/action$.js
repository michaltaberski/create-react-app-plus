import { Subject } from 'rxjs';

const action$ = new Subject();

export const dispatch = action => action$.next(action);

// const showText = actionDispatcher((text) => ({type: 'SHOW_TEXT', payload: text}))
// showText('Text to show!')
export const actionDispatcher = func => (...args) => dispatch(func(...args));

export default action$;
