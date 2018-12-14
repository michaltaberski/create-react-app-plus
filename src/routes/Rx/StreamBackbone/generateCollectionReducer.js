import produce from 'immer';
import { cid, generateStorePrefix } from './utils';

const generateCollectionReducer = ({ collectionId }) => {
  const STORE_PREFIX = generateStorePrefix(collectionId);

  const add = (state, action) => {
    return produce(state, draft => {
      draft.push(...action.payload.map(model => ({ cid: cid(), ...model })));
    });
  };

  const collectionReducer = (state, action) => {
    const map = new Map([[`${STORE_PREFIX}_ADD`, add]]);
    return map.has(action.type) ? map.get(action.type)(state, action) : state;
  };

  return collectionReducer;
};

export default generateCollectionReducer;
