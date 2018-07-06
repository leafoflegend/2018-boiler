import {
	Reducer,
	State,
	Action,
} from '../../../../@types/redux-types';

const drawerReducer: Reducer = (state: State, { type, data }: Action): State => {
	switch (type) {
	default:
		return state;
	}
};

export default drawerReducer;
