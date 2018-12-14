import produce from 'immer';
import { id, generateStorePrefix } from './utils';

const generateCollectionReducer = ({ storePath }) => {
  const STORE_PREFIX = generateStorePrefix(storePath);

  const add = (state, action) => {
    return produce(state, draft => {
      draft.push(...action.payload.map(model => ({ id: id(), ...model })));
    });
  };

  const collectionReducer = (state, action) => {
    const map = new Map([[`${STORE_PREFIX}_ADD`, add]]);
    return map.has(action.type) ? map.get(action.type)(state, action) : state;
  };

  return collectionReducer;
};

export default generateCollectionReducer;
