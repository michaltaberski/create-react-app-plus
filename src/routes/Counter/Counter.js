import React from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { withReducer } from 'utils/withReducer';
import { compose } from 'recompose';
import reducer, {
  reset,
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from './reducer';

const Counter = props => (
  <div>
    <h1>Counter</h1>
    <p>Count: {props.count}</p>

    <p>
      <button onClick={props.reset}>
        RESET
      </button>
    </p>
    <p>
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
        Increment Async
      </button>
    </p>

    <p>
      <button onClick={props.decrement}>Decrement</button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
        Decrement Async
      </button>
    </p>

    <p>
      <button onClick={() => props.push('/about-fsd')}>
        Go to about page via redux
      </button>
    </p>
  </div>
);

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing
});

const enhance = compose(
  withReducer('counter', reducer),
  connect(
    mapStateToProps,
    {
      reset,
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      push
    }
  )
);

export default enhance(Counter);
