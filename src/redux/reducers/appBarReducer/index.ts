import {
	Reducer,
	State,
	Action,
	Constants,
} from '../../../../@types/redux-types';

const appBarReducer: Reducer = (state: State, { type, data }: Action): State => {
	switch (type) {
	case Constants.APP_BAR_TOGGLE_MENU:
		return {
			...state,
			APP_BAR: {
				...state.APP_BAR,
				menu: {
					open: data,
				},
			},
		};
	default:
		return state;
	}
};

export default appBarReducer;
