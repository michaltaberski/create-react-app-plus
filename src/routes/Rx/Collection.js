import s$, { getState } from './store$';

const Collection = {};
Collection.extend = (options = {}) => {
  const { store$, storePath } = options;
  if (!store$) throw new Error('store$ is not defined');
  if (!storePath) throw new Error('storePath is not defined');

  return class CollectionClass {
    constructor(data, options = {}) {
      console.log('this.test: ', this.test);
    }

    clone() {
      throw new Error('clone is not supported');
    }

    toJSON() {
      const state = getState();
      return state[storePath];
    }

    // – extend
    // – model
    // – modelId
    // – constructor / initialize
    // – models
    // – toJSON
    // – sync
    // – Underscore Methods (46)
    // – add
    // – remove
    // – reset
    // – set
    // – get
    // – at
    // – push
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

const CountersCollection = Collection.extend({
  store$: s$,
  storePath: 'counters'
});

const countersCollection = new CountersCollection();
window.countersCollection = countersCollection;
