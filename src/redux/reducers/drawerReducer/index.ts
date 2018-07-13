import { Reducer } from 'redux';
import {
	State,
	SpecificAction,
} from '../../../../@types/redux-types';

const drawerReducer: Reducer = (state: State, { type, data }: SpecificAction): State => {
	switch (type) {
	default:
		return state;
	}
};

export default drawerReducer;
