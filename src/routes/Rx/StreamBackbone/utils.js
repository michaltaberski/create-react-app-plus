export const generateStorePrefix = collectionId => collectionId.toUpperCase();

export const generateActionsTypes = collectionId => {
  const STORE_PREFIX = generateStorePrefix(collectionId);
  return {
    add: `${STORE_PREFIX}_ADD`,
    remove: `${STORE_PREFIX}_REMOVE`,
    reset: `${STORE_PREFIX}_RESET`
  };
};

export const generateGetStateOfStore = store$ => () => {
  let state;
  store$.subscribe(_state => (state = _state)).unsubscribe();
  return state;
};

export const cid = () =>
  Math.random()
    .toString(36)
    .substr(2, 10);
