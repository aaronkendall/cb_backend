import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from './store';
import App from './containers/App';

const history = createBrowserHistory();
const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState, history);

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
