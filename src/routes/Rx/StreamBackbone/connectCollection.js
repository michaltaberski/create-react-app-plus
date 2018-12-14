import React from 'react';
import { generateGetStateOfStore } from './utils';

const connectCollection = (store$, mapStateToProps = state => state) => {
  const getState = generateGetStateOfStore(store$);
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

export default connectCollection;
