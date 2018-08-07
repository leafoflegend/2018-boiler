import { State, SpecificAction } from '../../@types/redux-types';

import initialState from './initial-state';
import appBarReducer from './appBarReducer';
import drawerReducer from './drawerReducer';
import modalReducer from './modalReducer';
import combineReducers from './combineReducers';

const rootReducer = (state: State = initialState, action: SpecificAction): State =>
  combineReducers(state, [appBarReducer, drawerReducer, modalReducer], action);

export default rootReducer;
