interface State<T> {
  index: string[];
  data: T[];
}

const generateEmptyState = () => ({
  index: [],
  data: [],
});

class Collection<T> {
  state: State<T> = generateEmptyState();

  push(item: T) {
    this.state.data.push(item);
  }
}

type ItemType = {
  name: string;
};

const x = new Collection<ItemType>();

interface Person {
  name: string;
  age?: number;
  location?: string;
}

type Part<T> = { [P in keyof T]?: T[P] };

type PartialPerson = Part<Person>;

type A = {
  e: string;
  d: boolean;
};
type B = 'a' | 'b';
type X = { [key in B]: string } & { [key in keyof A]: number };

const z: X = {
  a: '123',
  b: '123',
  e: 123,
  d: 123,
};
