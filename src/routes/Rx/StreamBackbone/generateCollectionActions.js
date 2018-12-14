import { actionDispatcher } from '../action$';
import { generateActionsTypes } from './utils';

const generateCollectionActions = ({ storePath }) => {
  const actions = {};
  const actionsTypes = generateActionsTypes(storePath);

  actions.add = actionDispatcher((modelsData = []) => ({
    type: actionsTypes.add,
    payload: modelsData
  }));

  return actions;
};

export default generateCollectionActions;
