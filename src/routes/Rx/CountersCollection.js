import store$ from './store$';
import Collection from './StreamBackbone/Collection';

const CountersCollection = Collection.extend({
  store$,
  collectionId: 'counters'
});

const countersCollection = new CountersCollection();
countersCollection.on('change', () =>
  console.log('EVENT: countersCollection - change ')
);

window.countersCollection = countersCollection;
