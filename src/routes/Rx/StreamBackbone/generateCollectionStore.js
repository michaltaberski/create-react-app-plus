import { filter, startWith, scan, shareReplay } from 'rxjs/operators';
import { generateActionsTypesMap, generateInitialState } from './utils';
import generateCollectionReducer from './generateCollectionReducer';
import action$ from '../action$';

const generateCollectionStore = ({ collectionId }) => {
  const ACTIONS_TYPES = Object.values(generateActionsTypesMap(collectionId));
  const collectionReducer = generateCollectionReducer({ collectionId });

  const store$ = action$.pipe(
    filter(action => ACTIONS_TYPES.includes(action.type)),
    startWith(generateInitialState()),
    scan(collectionReducer),
    shareReplay(1)
  );
  return store$;
};

export default generateCollectionStore;
