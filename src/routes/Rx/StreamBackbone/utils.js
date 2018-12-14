export const generateStorePrefix = storePath => storePath.toUpperCase();

export const generateActionsTypes = storePath => {
  const STORE_PREFIX = generateStorePrefix(storePath);
  return {
    add: `${STORE_PREFIX}_ADD`
  };
};

export const id = (length = 5) =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, length);
