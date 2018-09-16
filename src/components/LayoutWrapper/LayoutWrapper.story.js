import React from 'react';

import { storiesOf } from '@storybook/react';
import LayoutWrapper from './index.js';

storiesOf('LayoutWrapper', module).add('to Storybook', () => <LayoutWrapper>body</LayoutWrapper>);
