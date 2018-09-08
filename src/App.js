import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from 'routes/Home';
import About from 'routes/About';
import Counter from 'routes/Counter';
import LayoutWrapper from 'components/LayoutWrapper';
import TopMenu from 'components/TopMenu';
import PageBodyWrapper from 'components/PageBodyWrapper';

const App = () => (
  <LayoutWrapper>
    <header>
      <TopMenu>
        <Link to="/">Home</Link>
        <Link to="/about-us">About</Link>
        <Link to="/counter">Counter</Link>
      </TopMenu>
    </header>
    <PageBodyWrapper>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/counter" component={Counter} />
    </PageBodyWrapper>
  </LayoutWrapper>
);

export default App;
