import Backbone from 'backbone';
import { extend } from 'underscore';
import generateCollectionActions from './generateCollectionActions';
import generateCollectionStore from './generateCollectionStore';
import generateUpdatesStream from './generateUpdatesStream';
import { generateGetStateOfStore } from './utils';

const setupCollectionStore = (options = {}) => {
  const { storePath, initState } = options;
  const store$ = generateCollectionStore({ storePath, initState });
  const updates$ = generateUpdatesStream({ storePath, store$ });
  const actions = generateCollectionActions({ storePath });
  const getState = generateGetStateOfStore(store$);
  return { store$, updates$, actions, getState };
};

const Collection = {};
Collection.extend = (options = {}) => {
  const { storePath } = options;
  if (!storePath) throw new Error('storePath is not defined');
  const { store$, updates$, actions, getState } = setupCollectionStore(options);

  updates$.subscribe(updateAction => {
    console.log('updateAction: ', updateAction);
  });

  store$.subscribe(state => {
    console.log('COLLECTION STORE UPDATE', state);
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
