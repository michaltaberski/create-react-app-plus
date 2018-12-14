import React from 'react';
import { Subject } from 'rxjs';
import {
  startWith,
  scan,
  shareReplay,
  delay,
  filter,
  tap
} from 'rxjs/operators';
import produce from 'immer';

export const action$ = new Subject();

const id = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);

// Initial State
const initState = {
  text: '',
  counters: [
    { id: id(), count: 0 },
    { id: id(), count: 2 },
    { id: id(), count: 6 }
  ]
};

const inc = (state, action) =>
  produce(state, draft => {
    draft.counters.find(counter => counter.id === action.payload.id).count += 1;
  });

const dec = (state, action) => {
  return produce(state, draft => {
    draft.counters.find(counter => counter.id === action.payload.id).count -= 1;
  });
};

const del = (state, action) =>
  produce(state, draft => {
    const index = draft.counters.findIndex(
      counter => counter.id === action.payload.id
    );
    draft.counters.splice(index, 1);
  });

const add = (state, action) =>
  produce(state, draft => {
    draft.counters.push({ id: id(), count: 0 });
  });

const setText = (state, action) =>
  produce(state, draft => {
    draft.text = action.payload;
  });

const clearText = (state, action) =>
  produce(state, draft => {
    draft.text = '';
  });

// Redux reducer
const reducer = (state, action) => {
  const map = new Map([
    ['INC', inc],
    ['DEC', dec],
    ['DEL', del],
    ['ADD', add],
    ['SET_TEXT', setText],
    ['CLEAR_TEXT', clearText]
  ]);
  return map.has(action.type) ? map.get(action.type)(state, action) : state;
};

const clickEpic$ = action$.pipe(
  filter(action => action.type === 'SET_TEXT'),
  delay(1000),
  tap(() => dispatch({ type: 'CLEAR_TEXT' }))
);
clickEpic$.subscribe();

export const store$ = action$.pipe(
  startWith(initState),
  scan(reducer),
  shareReplay(1)
);

// // BASIC LOGGER
action$.subscribe(state => console.log('A: ', state));
store$.subscribe(state => console.log('S: ', state));

export const dispatch = action => action$.next(action);
// Higher order function to send actions to the stream
export const actionDispatcher = func => (...args) => dispatch(func(...args));

// Example action function
export const actions = {
  inc: actionDispatcher(id => ({ type: 'INC', payload: { id } })),
  dec: actionDispatcher(id => ({ type: 'DEC', payload: { id } })),
  del: actionDispatcher(id => ({ type: 'DEL', payload: { id } })),
  add: actionDispatcher(id => ({ type: 'ADD' })),
  setText: actionDispatcher(text => ({ type: 'SET_TEXT', payload: text }))
};

const getState = () => {
  let state;
  store$.subscribe(_state => (state = _state)).unsubscribe();
  return state;
};

export const connectRx = (mapStateToProps = state => state) => {
  return WrappedComponent => {
    return class extends React.Component {
      state = mapStateToProps(getState());

      componentDidMount() {
        this.subscriber = store$.subscribe(state => {
          this.setState(mapStateToProps(state));
        });
      }

      componentWillUnmount() {
        this.subscriber.unsubscribe();
      }

      render() {
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    };
  };
};
