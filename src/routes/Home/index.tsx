import * as React from 'react';
import { Category } from './demo';

const Home = () => {
  const x: Category = Category.Golf;
  console.log(x);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
