import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import history from './services/history';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
);
