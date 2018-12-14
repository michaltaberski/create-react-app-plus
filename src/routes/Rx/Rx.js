import React from 'react';
import { Helmet } from 'react-helmet';
import { actions } from './reducer';
import connectRx from './connectRx';

const Rx = props => (
  <div>
    <Helmet title="About" />
    <h1>Rx Page</h1>
    <ul>
      {props.counters.map(({ id, count }) => (
        <li key={id}>
          <small style={{ marginLeft: '10px', color: '#999' }}>#{id}</small>
          <h3 style={{ margin: '0 0 15px 0' }}>
            count: {count}
            &nbsp; &nbsp;
            <button onClick={() => actions.inc(id)}>+</button>
            <button onClick={() => actions.dec(id)}>-</button>
            &nbsp; &nbsp;
            <button
              onClick={() =>
                window.confirm('Are you sure?') && actions.del(id)
              }>
              DEL
            </button>
          </h3>
        </li>
      ))}
      <li>
        <button onClick={() => actions.add()}>ADD</button>
      </li>
    </ul>
    <h4>
      <button onClick={() => actions.setText('Click! (Hide text after 1s)')}>
        Click!
      </button>
      &nbsp;
      <span style={{ color: 'red' }}>{props.text}</span>
    </h4>
  </div>
);

const mapStateToProps = state => state;

export default connectRx(mapStateToProps)(Rx);
