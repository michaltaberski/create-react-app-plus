import React from 'react';
import { Helmet } from 'react-helmet';
import { connectRx, actions } from './rxStore';

const Rx = props => (
  <div>
    <Helmet title="About" />
    <h1>Rx Page</h1>
    <h2>Count: {props.count}</h2>
    <button onClick={actions.inc}>+</button>
    <button onClick={actions.dec}>-</button>
    <p>Did you get here via Redux?</p>
  </div>
);

const mapStateToProps = state => state;

export default connectRx(mapStateToProps)(Rx);
