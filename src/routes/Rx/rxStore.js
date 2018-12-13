import React from 'react';
import { Subject } from 'rxjs';
import { startWith, scan } from 'rxjs/operators';

export const action$ = new Subject();

const id = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);

// Initial State
const initState = {
  counters: [
    { id: id(), count: 0 },
    { id: id(), count: 2 },
    { id: id(), count: 6 }
  ]
};

// Redux reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      const incCounters = [...state.counters];
      const incIndex = state.counters.findIndex(
        counter => counter.id === action.payload.id
      );
      incCounters[incIndex].count += 1;
      return { ...state, incCounters };
    case 'DEC':
      const counters = [...state.counters];
      const index = state.counters.findIndex(
        counter => counter.id === action.payload.id
      );
      counters[index].count -= 1;
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export const store$ = action$.pipe(
  startWith(initState),
  scan(reducer)
);

// Higher order function to send actions to the stream
export const actionDispatcher = func => (...args) =>
  action$.next(func(...args));

// Example action function
export const actions = {
  inc: actionDispatcher(id => ({ type: 'INC', payload: { id } })),
  dec: actionDispatcher(id => ({ type: 'DEC', payload: { id } }))
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
