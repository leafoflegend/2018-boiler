import {
	Constants,
	Action,
	ActionCreator,
} from '../../../../@types/redux-types';

const modalOpen: ActionCreator = (type: string): Action => ({
	type: Constants.MODAL_OPEN,
	data: type,
});

export default modalOpen;
