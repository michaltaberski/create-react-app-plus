import React from 'react';
import action$ from './action$';
import store$, { getState } from './store$';

// // BASIC LOGGER
action$.subscribe(state => console.log('A: ', state));
store$.subscribe(state => console.log('S: ', state));

const connectRx = (mapStateToProps = state => state) => {
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

export default connectRx;
