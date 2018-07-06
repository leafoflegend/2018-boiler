import { Dispatch, State } from '../../../@types/redux-types';
import { openModal } from '../action-creators';

const initialState: State = {
	APP_BAR: {
		userMenu: {
			open: false,
			anchorEl: null,
			menuItems: [
				{
					title: 'Login',
					dispatchCb: () => openModal('login'),
				},
			],
		},
		menu: {
			open: false,
		},
		title: process.env.APPLICATION_NAME,
	},
	DRAWER: {},
	MODAL: {
		title: null,
		content: null,
		actions: null,
		type: null,
		open: false,
		splitChunks: {
			main: null,
		},
	},
};

export default initialState;
