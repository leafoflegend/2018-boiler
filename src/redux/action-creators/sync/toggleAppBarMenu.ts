import {
	Constants,
	Action,
	ActionCreator,
} from '../../../../@types/redux-types';

const toggleAppBarMenu: ActionCreator = (open: boolean): Action => ({
	type: Constants.APP_BAR_TOGGLE_MENU,
	data: open,
});

export default toggleAppBarMenu;
