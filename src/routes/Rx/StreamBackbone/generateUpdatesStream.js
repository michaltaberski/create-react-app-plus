import { generateActionsTypesMap } from './utils';
import { filter, withLatestFrom, map } from 'rxjs/operators';

import action$ from '../action$';

const generateUpdatesStream = ({ collectionId, store$ }) => {
  const ACTIONS_TYPES = Object.values(generateActionsTypesMap(collectionId));
  return action$.pipe(
    filter(action => ACTIONS_TYPES.includes(action.type)),
    withLatestFrom(store$),
    map(([action, state]) => {
      return { action, collection: state };
    })
  );
};

export default generateUpdatesStream;
