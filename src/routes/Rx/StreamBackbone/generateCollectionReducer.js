import produce from 'immer';
import {
  generateCid,
  generateActionsTypesMap,
  generateInitialState
} from './utils';

const add = (state, action) =>
  produce(state, draft => {
    action.payload.forEach(model => {
      const cid = generateCid();
      draft.index.push(cid);
      draft.idIndex.push(model.id);
      draft.data[cid] = { cid, ...model };
    });
  });

const remove = (state, action) =>
  produce(state, draft => {
    action.payload.forEach(model => {
      const cid = action.payload;
      delete draft.index[draft.index.indexOf(cid)];
      delete draft.idIndex[draft.index.indexOf(cid)];
      delete draft.data[cid];
    });
  });

const reset = (state, action) =>
  produce(state, draft => generateInitialState());

const generateCollectionReducer = ({ collectionId }) => {
  const actionsTypesMap = generateActionsTypesMap(collectionId);
  const collectionReducer = (state, action) => {
    const map = new Map([
      [actionsTypesMap.add, add],
      [actionsTypesMap.remove, remove],
      [actionsTypesMap.reset, reset]
    ]);
    return map.has(action.type) ? map.get(action.type)(state, action) : state;
  };
  return collectionReducer;
};

export default generateCollectionReducer;
