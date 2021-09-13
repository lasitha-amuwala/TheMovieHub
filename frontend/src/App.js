import React from 'react';
import { Nav } from './components/Nav';
import { Billboard } from './components/Billboard';

export const App = () => {
  return (
    <div>
      <Nav />
      <Billboard />
    </div>
  );
};

/*

    background-image: -webkit-gradient(linear,left top,left bottom,color-stop(10%,rgba(0,0,0,.7)),color-stop(10%,rgba(0,0,0,0)));
    background-image: -webkit-linear-gradient(top,rgba(0,0,0,.7) 10%,rgba(0,0,0,0));
    background-image: -moz- oldlinear-gradient(top,rgba(0,0,0,.7) 10%,rgba(0,0,0,0));
    background-image: -o-linear-gradient(top,rgba(0,0,0,.7) 10%,rgba(0,0,0,0));
    background-image: linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0));
    */
