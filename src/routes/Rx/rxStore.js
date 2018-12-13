import React from 'react';
import { Subject } from 'rxjs';
import { startWith, scan } from 'rxjs/operators';

export const action$ = new Subject();

// Initial State
const initState = { count: 0 };

// Redux reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return { ...state, count: state.count + 1 };
    case 'DEC':
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
  inc: actionDispatcher(() => ({ type: 'INC' })),
  dec: actionDispatcher(() => ({ type: 'DEC' }))
};

export const connectRx = (mapStateToProps = state => state) => {
  return WrappedComponent => {
    return class extends React.Component {
      componentDidMount() {
        store$.subscribe(state => {
          console.log('state: ', state);
          this.setState(mapStateToProps(state));
        });
      }

      render() {
        console.log('state: ', this.state);
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    };
  };
};
