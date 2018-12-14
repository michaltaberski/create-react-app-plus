import { filter, startWith, scan, shareReplay } from 'rxjs/operators';
import { generateActionsTypes } from './utils';
import generateCollectionReducer from './generateCollectionReducer';
import action$ from '../action$';

const generateCollectionStore = ({ storePath, initState = [] }) => {
  const ACTIONS_TYPES = Object.values(generateActionsTypes(storePath));
  const collectionReducer = generateCollectionReducer({ storePath });

  const store$ = action$.pipe(
    filter(action => ACTIONS_TYPES.includes(action.type)),
    startWith(initState),
    scan(collectionReducer),
    shareReplay(1)
  );
  return store$;
};

export default generateCollectionStore;
