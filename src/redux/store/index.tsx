import React, {Component, ReactNode} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, Store, Middleware} from 'redux';
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';
import {createLogger} from 'redux-logger';
import thunkMiddleware, {ThunkMiddleware} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBrowserHistory} from 'history';
import rootReducer from '../reducers';
import {SpecificAction, State} from '../../../@types/redux-types';

const history = createBrowserHistory();

let store: Store;

let myMiddleware: Middleware[] = [
  routerMiddleware(history),
  thunkMiddleware as ThunkMiddleware<State, SpecificAction, any>,
];

if (process.env.NODE_ENV === 'production') {
  myMiddleware = [thunkMiddleware];

  store = createStore(connectRouter(history)(rootReducer), applyMiddleware(...myMiddleware));
} else {
  myMiddleware.push(
    createLogger({
      collapsed: true,
    }),
  );

  store = createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(applyMiddleware(...myMiddleware)),
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(connectRouter(history)(nextRootReducer));
    });
  }
}

const finalizedStore = store;

// @ts-ignore
window.reduxStore = finalizedStore;

class ProviderAndHistory extends Component<{children?: ReactNode}> {
  render() {
    const {children} = this.props;

    return (
      <Provider store={finalizedStore}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    );
  }
}

export default ProviderAndHistory;
