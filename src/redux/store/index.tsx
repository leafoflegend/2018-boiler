import React, { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store, Middleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import HistoryProvider from '../history';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const history = createBrowserHistory();

interface NormalProps {
  children?: ReactNode;
}

type Props = NormalProps;

class History extends Component<Props> {
  public render() {
    const { children } = this.props;

    return <HistoryProvider.Provider value={history}>{children}</HistoryProvider.Provider>;
  }
}

let store: Store;
const sagaMiddleware = createSagaMiddleware();

const myMiddleware: Middleware[] = [routerMiddleware(history), sagaMiddleware];

if (process.env.NODE_ENV === 'production') {
  store = createStore(
    connectRouter(history)(rootReducer),
    compose(applyMiddleware(...myMiddleware)),
  );
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

sagaMiddleware.run(rootSaga);

const finalizedStore = store;

// @ts-ignore
window.reduxStore = finalizedStore;

class ProviderClass extends Component<{ children?: ReactNode }> {
  render() {
    const { children } = this.props;

    return (
      <Provider store={finalizedStore}>
        <History>{children}</History>
      </Provider>
    );
  }
}

export default ProviderClass;
