import './app/assets/stylesheet/application';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './app/components/app';

const app = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(app, document.getElementById('root'));

