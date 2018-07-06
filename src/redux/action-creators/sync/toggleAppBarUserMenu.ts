import {
	Constants,
	Action,
	ActionCreator,
} from '../../../../@types/redux-types';

const toggleAppBarUserMenu: ActionCreator = ({ open, node = null }: { open: boolean, node: Node | null }): Action => ({
	type: Constants.APP_BAR_TOGGLE_USER_MENU,
	data: {
		open,
		node,
	},
});

export default toggleAppBarUserMenu;
