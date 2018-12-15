import { actionDispatcher } from '../action$';
import { generateActionsTypesMap } from './utils';

const generateAction = actionType =>
  actionDispatcher((payload, meta = {}) => ({
    type: actionType,
    payload,
    meta
  }));

const generateCollectionActions = ({ collectionId }) => {
  const actionsTypesMap = generateActionsTypesMap(collectionId);
  return Object.entries(actionsTypesMap).reduce(
    (acc, [actionName, actionType]) => {
      acc[actionName] = generateAction(actionType);
      return acc;
    },
    {}
  );
};

export default generateCollectionActions;
