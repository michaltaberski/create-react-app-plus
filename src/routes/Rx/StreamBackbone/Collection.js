import Backbone from 'backbone';
import { extend } from 'underscore';
import { getState, injectReducer } from '../store$';
import generateCollectionActions from './generateCollectionActions';
import generateCollectionReducer from './generateCollectionReducer';
import generateUpdatesStream from './generateUpdatesStream';

const setupCollectionStore = (options = {}) => {
  const { storePath } = options;
  injectReducer(generateCollectionReducer({ storePath }));
  const actions = generateCollectionActions({ storePath });
  const updates$ = generateUpdatesStream({ storePath });
  return { actions, updates$ };
};

const Collection = {};
Collection.extend = (options = {}) => {
  const { store$, storePath } = options;
  if (!store$) throw new Error('store$ is not defined');
  if (!storePath) throw new Error('storePath is not defined');
  const { actions, updates$ } = setupCollectionStore(options);

  updates$.subscribe(updateAction => {
    console.log('updateAction: ', updateAction);
  });

  return class CollectionClass {
    constructor() {
      extend(this, Backbone.Events);
    }

    clone() {
      throw new Error('CLONE method is not supported');
    }

    extend() {
      throw new Error('EXTEND method is not supported');
    }

    toJSON() {
      const state = getState();
      return state[storePath];
    }

    add(objectToAdd) {
      actions.add(Array.isArray(objectToAdd) ? objectToAdd : [objectToAdd]);
    }

    push(model) {
      actions.add([model]);
      this.trigger('add');
    }

    set(models = []) {
      actions.set(models);
    }

    // – model
    // – modelId
    // – constructor / initialize
    // – models
    // – sync
    // – Underscore Methods (46)
    // – add
    // – remove
    // – reset
    // – get
    // – at
    // – pop
    // – unshift
    // – shift
    // – slice
    // – length
    // – comparator
    // – sort
    // – pluck
    // – where
    // – findWhere
    // – url
    // – parse
    // – fetch
    // – create
  };
};

export default Collection;
