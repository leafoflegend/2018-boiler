import { createStore, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

let store: Store | null = null;

let myMiddleware = [
	thunkMiddleware,
];

if (process.env.NODE_ENV === 'production') {
	myMiddleware = [thunkMiddleware];

	store = createStore(
		rootReducer,
		applyMiddleware(
			...myMiddleware,
		),
	);
} else {
	myMiddleware.push(createLogger({
		collapsed: true,
	}));

	store = createStore(
		rootReducer,
		composeWithDevTools(
			applyMiddleware(
				...myMiddleware,
			),
		),
	);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}
}

const finalizedStore = store;

// @ts-ignore
window.reduxStore = finalizedStore;

export default finalizedStore;
