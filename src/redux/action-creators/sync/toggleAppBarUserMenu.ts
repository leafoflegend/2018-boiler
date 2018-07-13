import { ActionCreator } from 'redux';
import {
	Constants,
	SpecificAction,
} from '../../../../@types/redux-types';

const toggleAppBarUserMenu: ActionCreator<SpecificAction> = ({ open, node = null }: { open: boolean, node: Node | null }): SpecificAction => ({
	type: Constants.APP_BAR_TOGGLE_USER_MENU,
	data: {
		open,
		node,
	},
});

export default toggleAppBarUserMenu;
