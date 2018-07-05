import initialState from './initial-state';
import appBarReducer from './appBarReducer';
import drawerReducer from './drawerReducer';
import modalReducer from './modalReducer';
import combineReducers from './combineReducers';

const rootReducer = (state = initialState, action) => combineReducers(
	state,
	[
		appBarReducer,
		drawerReducer,
		modalReducer,
	],
	action,
);

export default rootReducer;
