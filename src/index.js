import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import store from './store';
import history from './history';
import App from './App';
import GlobalStyle from './GlobalStyle';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Helmet titleTemplate="MySite.com - %s" defaultTitle="MySite.com" />
        <GlobalStyle />
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
