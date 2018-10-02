import { INCREMENT } from './reducer';
import { map } from 'rxjs/operators';

export default actions$ => {
  actions$
    .ofType(INCREMENT)
    .pipe(map(action => ({ ...action, demo: 1 })))
    .subscribe(val => {
      console.log('val: ', val);
    });
  return [];
};
