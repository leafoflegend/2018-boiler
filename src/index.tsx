import 'react-hot-loader/patch';
import 'normalize.css/normalize.css';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './redux';
import Container from './react';

if (process.env.NODE_ENV === 'production') {
  const OfflinePluginRuntime = require('offline-plugin/runtime');

  OfflinePluginRuntime.install({
    onUpdateReady: () => {
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    },
  });
}

const renderRoot = (Component: JSX.Element): void => {
  if (process.env.NODE_ENV === 'development') {
    ReactDOM.render(
      <AppContainer>
        <Provider>{Component}</Provider>
      </AppContainer>,
      document.getElementById('app'),
    );
  }

  if (process.env.NODE_ENV === 'production') {
    ReactDOM.render(<Provider>{Component}</Provider>, document.getElementById('app'));
  }
};

Container().then(renderRoot);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./react', () => {
    const NextContainer: () => Promise<JSX.Element> = require('./react').default;
    NextContainer()
      .then(renderRoot)
      .catch(() =>
        console.warn(`${process.env.APPLICATION_NAME} failed to hot reload react root.`),
      );
  });
}
