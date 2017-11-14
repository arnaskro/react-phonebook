import React, { Component } from 'react';
import './App.css';
import Contacts from '../Contacts';
import FontAwesome from 'react-fontawesome';

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

        <footer className="text-center">
          <a href="https://github.com/arnaskro/react-phonebook" title="GitHub"><FontAwesome name="github" size="2x"/></a>
        </footer>
      </div>
    );
  }
}

export default App;
