import React from 'react';
import { Helmet } from 'react-helmet';
import CountersCollection from './CountersCollection';
import connectCollection from './StreamBackbone/connectCollection';

const countersCollection = new CountersCollection();
window.countersCollection = countersCollection;

const actions = countersCollection.getActions();

const Rx = props => (
  <div>
    <Helmet title="About" />
    <h1>Rx Page</h1>
    <ul>
      {props.counters.map(({ cid, count }) => (
        <li key={cid}>
          <small style={{ marginLeft: '10px', color: '#999' }}>#{cid}</small>
          <h3 style={{ margin: '0 0 15px 0' }}>
            count: {count}
            &nbsp; &nbsp;
            <button onClick={() => actions.inc(cid)}>+</button>
            <button onClick={() => actions.dec(cid)}>-</button>
            &nbsp; &nbsp;
            <button
              onClick={() =>
                window.confirm('Are you sure?') && actions.del(cid)
              }>
              DEL
            </button>
          </h3>
        </li>
      ))}
      <li>
        <button onClick={() => actions.add([{ count: 0 }, { count: 10 }])}>
          ADD
        </button>
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

const mapStateToProps = state => ({
  counters: state
});

export default connectCollection(
  countersCollection.getStore$(),
  mapStateToProps
)(Rx);
