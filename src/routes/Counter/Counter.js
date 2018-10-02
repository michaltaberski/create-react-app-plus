import React from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { withReducer } from 'utils/withReducer';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import * as selectors from './selectors';
import epic from './epic';
import reducer, {
  REDUCER_NAME,
  reset,
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from './reducer';

const Counter = props => (
  <div>
    <Helmet title="Counter" />
    <h1>Counter</h1>
    <p>Count: {props.count}</p>

    <p>
      <button onClick={props.reset}>RESET</button>
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
      <button onClick={() => props.push('/')}>Go to Home via redux</button>
    </p>
  </div>
);

const mapStateToProps = state => ({
  count: selectors.counterValueSelector(state),
  isIncrementing: selectors.counterIsIncrementingSelector(state),
  isDecrementing: selectors.counterIsDecrementingSelector(state)
});

const enhance = compose(
  withReducer(REDUCER_NAME, reducer, epic),
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
