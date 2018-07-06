import { State } from '../../../@types/redux-types';

const initialState: State = {
	APP_BAR: {
		userMenu: {
			open: false,
			anchorEl: null,
			menuItems: [
				{ title: 'Login' },
			],
		},
		menu: {
			open: false,
		},
		title: process.env.APPLICATION_NAME,
	},
	DRAWER: {},
	MODAL: {},
};

export default initialState;
