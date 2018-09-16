import { configure } from '@storybook/react';
import '../src/GlobalStyle';

const req = require.context('../src/components', true, /\.story\.js$/)

function loadStories() {
  require('../src/stories');
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
