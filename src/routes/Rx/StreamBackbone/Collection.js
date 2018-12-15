import Backbone from 'backbone';
import { extend } from 'underscore';
import generateCollectionActions from './generateCollectionActions';
import generateCollectionStore from './generateCollectionStore';
import generateUpdatesStream from './generateUpdatesStream';
import {
  generateGetStateOfStore,
  mapUpdateActionToEvent,
  findCid
} from './utils';

const setupCollectionStore = (options = {}) => {
  const { collectionId } = options;
  const store$ = generateCollectionStore({ collectionId });
  const updates$ = generateUpdatesStream({ collectionId, store$ });
  const actions = generateCollectionActions({ collectionId });
  const getState = generateGetStateOfStore(store$);
  return { store$, updates$, actions, getState };
};

const Collection = {};
Collection.extend = (options = {}) => {
  const { collectionId } = options;
  if (!collectionId) throw new Error('collectionId is not defined');
  const { store$, updates$, actions, getState } = setupCollectionStore(options);

  updates$.subscribe(updateAction => {
    console.log('updateAction: ', updateAction);
  });

  store$.subscribe(state => {
    console.log('COLLECTION STORE UPDATE', state);
  });

  return class CollectionClass {
    getStore$() {
      return store$;
    }

    getUpdates$() {
      return updates$;
    }

    getActions() {
      return actions;
    }

    constructor() {
      extend(this, Backbone.Events);
      updates$.subscribe(updateAction => {
        const [eventName, eventPayload] = mapUpdateActionToEvent(updateAction, {
          collectionId
        });
        this.trigger(eventName, eventPayload);
      });
    }

    clone() {
      throw new Error('CLONE method is not supported');
    }

    extend() {
      throw new Error('EXTEND method is not supported');
    }

    toJSON() {
      return getState();
    }

    add(objectToAdd) {
      actions.add(Array.isArray(objectToAdd) ? objectToAdd : [objectToAdd]);
    }

    push(model) {
      actions.add([model]);
    }

    set(models = []) {
      actions.set(models);
    }

    remove(cidOrIdOrModel) {
      actions.remove(findCid(cidOrIdOrModel, getState()));
    }

    reset() {
      actions.reset();
    }

    get(cidOrIdOrModel) {
      const state = getState();
      const cid = findCid(cidOrIdOrModel, state);
      return state.data[cid];
    }
    // – model
    // – modelId
    // – constructor / initialize
    // – models
    // – sync
    // – Underscore Methods (46)
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
