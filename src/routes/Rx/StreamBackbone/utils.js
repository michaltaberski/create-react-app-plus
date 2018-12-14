export const generateStorePrefix = collectionId => collectionId.toUpperCase();

export const generateActionsTypes = collectionId => {
  const STORE_PREFIX = generateStorePrefix(collectionId);
  return {
    add: `${STORE_PREFIX}_ADD`
  };
};

export const generateGetStateOfStore = store$ => () => {
  let state;
  store$.subscribe(_state => (state = _state)).unsubscribe();
  return state;
};

export const id = (length = 5) =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, length);
