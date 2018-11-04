import { Reducer } from 'redux';
import { State, SpecificAction } from '../../@types/redux-types';
import initialState from './initial-state';
import appBarReducer from './appBarReducer';
import drawerReducer from './drawerReducer';
import modalReducer from './modalReducer';
import loginReducer from './loginReducer';
import combineReducers from './combineReducers';

const allReducers: Reducer[] = [appBarReducer, drawerReducer, modalReducer, loginReducer];

const rootReducer = (state: State = initialState, action: SpecificAction): State =>
  combineReducers(state, allReducers, action);

export default rootReducer;
