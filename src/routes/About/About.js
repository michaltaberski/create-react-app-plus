import React from 'react';
import { withReducer } from 'utils/withReducer';
import reducer from './reducer';

const About = props => (
  <div>
    <h1>About Page</h1>
    <p>Did you get here via Redux?</p>
  </div>
);

export default withReducer('about', reducer)(About);
