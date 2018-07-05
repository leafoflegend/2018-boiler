import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './react';

const renderRoot = (Component) => {
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
		const NextContainer = require('./react').default;
		NextContainer().then(renderRoot);
	});
}
