import { actionDispatcher } from '../action$';
import { generateActionsTypes } from './utils';

const generateAction = actionType =>
  actionDispatcher((payload, meta = {}) => ({
    type: actionType,
    payload,
    meta
  }));

const generateCollectionActions = ({ collectionId }) => {
  const actionsTypes = generateActionsTypes(collectionId);
  return Object.entries(actionsTypes).reduce(
    (acc, [actionName, actionType]) => {
      acc[actionName] = generateAction(actionType);
      return acc;
    },
    {}
  );
};

export default generateCollectionActions;
