import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from 'routes/Home';
import About from 'routes/About';
import Counter from 'routes/Counter';

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/counter">Counter</Link>
    </header>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/counter" component={Counter} />
    </main>
  </div>
);

export default App;
