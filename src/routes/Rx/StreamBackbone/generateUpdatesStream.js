import { generateActionsTypes } from './utils';
import { filter, withLatestFrom, map } from 'rxjs/operators';

import action$ from '../action$';

const generateUpdatesStream = ({ storePath, store$ }) => {
  const ACTIONS_TYPES = Object.values(generateActionsTypes(storePath));
  return action$.pipe(
    filter(action => ACTIONS_TYPES.includes(action.type)),
    withLatestFrom(store$),
    map(([action, state]) => {
      return { action, collection: state };
    })
  );
};

export default generateUpdatesStream;
