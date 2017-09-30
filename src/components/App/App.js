import React, { Component } from 'react';
import './App.css';
import Contacts from '../Contacts';

import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React Phonebook</h1>
        </header>

        <Container>
          <Contacts />
        </Container>

      </div>
    );
  }
}

export default App;
