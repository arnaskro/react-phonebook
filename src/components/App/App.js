import React, { Component } from 'react';
import './App.css';
import Counter from '../Counter/Counter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React Phonebook</h1>
        </header>
        <br />
        <Counter />
      </div>
    );
  }
}

export default App;
