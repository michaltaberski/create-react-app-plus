import React from 'react';
import { Helmet } from 'react-helmet';
import { connectRx, actions } from './rxStore';

const Rx = props => (
  <div>
    <Helmet title="About" />
    <h1>Rx Page</h1>
    <ul>
      {props.counters.map(({ id, count }) => (
        <li key={id}>
          <h2>
            {id} count: {count}
          </h2>
          <button onClick={() => actions.inc(id)}>+</button>
          <button onClick={() => actions.dec(id)}>-</button>
        </li>
      ))}
    </ul>
    <p>Did you get here via Redux?</p>
  </div>
);

const mapStateToProps = state => state;

export default connectRx(mapStateToProps)(Rx);
