import React, { Component } from 'react';
// style things in this file
import './App.css';
import Nav from './nav';

class App extends Component {
state = {
    data: null
  };

  render() {
    return (
      <div>
        <Nav />
      </div>
    );
  }
}

export default App;