import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { syncTranslationWithStore } from 'react-redux-i18n';

import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));
syncTranslationWithStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();