export const generateStorePrefix = collectionId => collectionId.toUpperCase();

export const generateActionsTypesMap = collectionId => {
  const STORE_PREFIX = generateStorePrefix(collectionId);
  return {
    add: `${STORE_PREFIX}_ADD`,
    remove: `${STORE_PREFIX}_REMOVE`,
    reset: `${STORE_PREFIX}_RESET`
  };
};

const revertHashKeys = hashObject =>
  Object.entries(hashObject).reduce((acc, [k, v]) => {
    acc[v] = k;
    return acc;
  }, {});

const mapUpdateActionToEventName = (updateAction, { actionsMap }) => {
  return actionsMap[updateAction.action.type];
};

const mapUpdateActionToEventPayload = updateAction => {};

export const mapUpdateActionToEvent = (updateAction, { collectionId }) => {
  const actionsMap = revertHashKeys(generateActionsTypesMap(collectionId));
  return [
    mapUpdateActionToEventName(updateAction, { actionsMap }),
    mapUpdateActionToEventPayload(updateAction)
  ];
};

export const generateGetStateOfStore = store$ => () => {
  let state;
  store$.subscribe(_state => (state = _state)).unsubscribe();
  return state;
};

export const generateInitialState = (options = {}) => ({
  index: [],
  idIndex: [],
  data: {}
});

export const generateCid = () =>
  Math.random()
    .toString(36)
    .substr(2, 10);

export const findCid = (cidOrIdOrModel, state) => {
  let id = undefined;
  if (typeof cidOrIdOrModel === 'string') {
    // cidOrIdOrModel === cid
    if (state.data[cidOrIdOrModel]) return cidOrIdOrModel;
    id = cidOrIdOrModel;
  } else if (typeof cidOrIdOrModel === 'object') {
    id = cidOrIdOrModel.id;
  }
  // idIndex === cidIndex
  const index = state.idIndex.indexOf(id);
  // state.index[index] === cid
  if (index !== -1) return state.index[index];
  throw new Error('Cid cannot be find');
};
