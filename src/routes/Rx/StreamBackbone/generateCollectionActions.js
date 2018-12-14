import { actionDispatcher } from '../action$';
import { generateActionsTypes } from './utils';

const generateCollectionActions = ({ collectionId }) => {
  const actions = {};
  const actionsTypes = generateActionsTypes(collectionId);

  actions.add = actionDispatcher((modelsData = []) => ({
    type: actionsTypes.add,
    payload: modelsData
  }));

  return actions;
};

export default generateCollectionActions;
