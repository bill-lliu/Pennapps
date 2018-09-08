import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './css/index.css';

ReactDOM.render(
  (
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('root'));
registerServiceWorker();
