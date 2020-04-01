import React from 'react';

import {useUser} from "./session/hooks"

import logo from './logo.svg';

import './App.css';

function App() {
  const user = useUser();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bienvenido: {user.displayName} - {user.email}
        </a>
      </header>
    </div>
  );
}

export default App;
