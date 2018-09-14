import React from "react";
import {Route, Link, Switch} from "react-router-dom";
import Home from "routes/Home";
import About from "routes/About";
import Counter from "routes/Counter";
import NotFound404 from "routes/NotFound404";

import LayoutWrapper from "components/LayoutWrapper";
import TopMenu from "components/TopMenu";
import PageBodyWrapper from "components/PageBodyWrapper";

const App = () => <LayoutWrapper>
  <header>
    <TopMenu>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/counter">Counter</Link>
    </TopMenu>
  </header>
  <PageBodyWrapper>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/counter" component={Counter} />
      <Route component={NotFound404} />
    </Switch>
  </PageBodyWrapper>
</LayoutWrapper>;

export default App