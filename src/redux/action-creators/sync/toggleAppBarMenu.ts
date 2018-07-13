import { ActionCreator } from 'redux';
import {
	Constants,
	SpecificAction,
} from '../../../../@types/redux-types';

const toggleAppBarMenu: ActionCreator<SpecificAction> = (open: boolean): SpecificAction => ({
	type: Constants.APP_BAR_TOGGLE_MENU,
	data: open,
});

export default toggleAppBarMenu;
