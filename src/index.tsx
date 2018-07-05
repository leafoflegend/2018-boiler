import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './react';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

if (process.env.NODE_ENV === 'production') {
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
	ReactDOM.render(
		<AppContainer>
			{ Component }
		</AppContainer>,
	document.getElementById('app'),
);
};

Container().then(renderRoot);

if (module.hot) {
	module.hot.accept('./react', () => {
		const NextContainer: () => Promise<JSX.Element> = require('./react').default;
		NextContainer()
			.then(renderRoot)
			.catch(() => console.warn(`${process.env.APPLICATION_NAME} failed to hot reload react root.`));
	});
}
