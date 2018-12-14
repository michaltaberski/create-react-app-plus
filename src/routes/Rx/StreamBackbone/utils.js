export const generateStorePrefix = storePath => storePath.toUpperCase();

export const generateActionsTypes = storePath => {
  const STORE_PREFIX = generateStorePrefix(storePath);
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
