import React from 'react';
import ReactDOM from 'react-dom';

import {Provider as SessionProvider} from "./session/context";
import {Provider as TodoProvider} from "./todo/context";
import Todos from "./todo/screens/Todos";

import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <TodoProvider>
        <Todos />
      </TodoProvider>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
