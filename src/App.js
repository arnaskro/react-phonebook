import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React Phonebook</h1>
        </header>
        <br />
          <Button color="danger">Danger!</Button>
      </div>
    );
  }
}

export default App;
