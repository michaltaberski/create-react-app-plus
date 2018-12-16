declare namespace Collection {
  interface State<T> {
    index: string[];
  }

  class Collection<T> {
    state: State<T>;

    push(item: T): void;
  }
}

// type ItemType = {
//   name: string;
// };
//
class Coll extends Collection.Collection<ItemType> {}

const c = new Coll();

c.push({ name: 'Jan' });
