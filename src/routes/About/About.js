import React from 'react';
import { Helmet } from 'react-helmet';
import { withReducer } from 'utils/withReducer';
import reducer from './reducer';

const About = props => (
  <div>
    <Helmet title="About" />
    <h1>About Page</h1>
    <p>Did you get here via Redux?</p>
  </div>
);

export default withReducer('about', reducer)(About);
